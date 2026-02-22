/**
 * SPOOLID BACKEND API
 *
 * Riceve upload di video (chunked o single-shot) e iscrizioni alla newsletter
 * dalla landing page di SpoolID.
 */

// ==========================================
// 🔴 CONFIGURAZIONE INIZIALE OBBLIGATORIA 🔴
// ==========================================
const FOLDER_ID = "INSERISCI_QUI_L_ID_DELLA_CARTELLA_DRIVE";
const SPREADSHEET_ID = "INSERISCI_QUI_L_ID_DEL_FOGLIO_GOOGLE";
const NOTIFICATION_EMAIL = "antoniocolucciph@gmail.com";

// ==========================================
// ⚙️ CODICE DI SISTEMA (Non Modificare) ⚙️
// ==========================================

function doOptions(e) {
    return ContentService.createTextOutput("")
        .setMimeType(ContentService.MimeType.TEXT)
        .setHeader("Access-Control-Allow-Origin", "*")
        .setHeader("Access-Control-Allow-Methods", "POST")
        .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function doPost(e) {
    try {
        var payload;
        try {
            payload = JSON.parse(e.postData.contents);
        } catch (parseError) {
            return respondError("I dati inviati non sono nel formato JSON corretto.");
        }

        var action = payload.action;

        // --- AZIONE 1: Iscrizione Newsletter ---
        if (action === "newsletter") {
            var email = payload.email;
            if (!email) return respondError("Email mancante.");
            if (SPREADSHEET_ID === "INSERISCI_QUI_L_ID_DEL_FOGLIO_GOOGLE")
                return respondError("ATTENZIONE: Devi inserire il tuo SPREADSHEET_ID nello script su Google!");

            var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
            sheet.appendRow([new Date(), email]);

            try {
                MailApp.sendEmail({
                    to: NOTIFICATION_EMAIL,
                    subject: "🎉 SpoolID AI: Nuova Iscrizione Newsletter!",
                    body: "Ottime notizie!\n\nEmail: " + email + "\nData: " + new Date().toLocaleString()
                });
            } catch (mailError) {
                console.error("Errore invio notifica email newsletter: " + mailError);
            }
            return respondSuccess("Email salvata con successo.");
        }

        // --- AZIONE 2: Upload Video (LEGACY – singolo chunk) ---
        // Mantenuto per compatibilità con eventuali client vecchi
        else if (action === "upload_video") {
            var fileData = payload.fileData;
            var fileName = payload.fileName || ("SpoolVideo_" + new Date().getTime() + ".mp4");
            var mimeType = payload.mimeType || "video/mp4";
            if (!fileData) return respondError("Nessun frammento video ricevuto.");
            if (FOLDER_ID === "INSERISCI_QUI_L_ID_DELLA_CARTELLA_DRIVE")
                return respondError("ATTENZIONE: Devi inserire il tuo FOLDER_ID nello script su Google!");

            var folder = DriveApp.getFolderById(FOLDER_ID);
            var decodedFile = Utilities.base64Decode(fileData.split(',')[1] || fileData);
            var blob = Utilities.newBlob(decodedFile, mimeType, fileName);
            var file = folder.createFile(blob);

            try {
                MailApp.sendEmail({
                    to: NOTIFICATION_EMAIL,
                    subject: "📼 SpoolID AI: Nuovo Video Ricevuto per il Dataset!",
                    body: "Ottimo lavoro!\n\nNome file: " + fileName + "\nLink: " + file.getUrl() + "\nData: " + new Date().toLocaleString()
                });
            } catch (mailError) {
                console.error("Errore invio notifica email video: " + mailError);
            }
            return respondSuccess({ message: "Video caricato con successo sul Drive", fileUrl: file.getUrl() });
        }

        // --- AZIONE 3: Upload Video CHUNKED (memory-safe per Android) ---
        // Il frontend invia il video a pezzi da ~4 MB.
        // Ogni chunk viene salvato come file temporaneo su Drive.
        // Quando arriva l'ultimo chunk, vengono ricongiunti e il file finale viene creato.
        else if (action === "upload_chunk") {
            var uploadId = payload.uploadId;
            var chunkIndex = payload.chunkIndex;    // 0-based
            var totalChunks = payload.totalChunks;
            var chunkData = payload.chunkData;     // base64 string
            var fileName = payload.fileName || ("SpoolVideo_" + uploadId + ".mp4");
            var mimeType = payload.mimeType || "video/mp4";

            if (!uploadId || chunkData === undefined || chunkData === null)
                return respondError("Chunk non valido.");
            if (FOLDER_ID === "INSERISCI_QUI_L_ID_DELLA_CARTELLA_DRIVE")
                return respondError("ATTENZIONE: Devi inserire il tuo FOLDER_ID nello script su Google!");

            var folder = DriveApp.getFolderById(FOLDER_ID);

            // Salva il chunk come file temporaneo: "tmp_<uploadId>_<index>"
            var tmpFileName = "tmp_" + uploadId + "_" + chunkIndex;
            var chunkBytes = Utilities.base64Decode(chunkData);
            var chunkBlob = Utilities.newBlob(chunkBytes, "application/octet-stream", tmpFileName);

            // Se esiste già un file temporaneo con lo stesso nome, lo elimina (retry safety)
            var existing = folder.getFilesByName(tmpFileName);
            while (existing.hasNext()) existing.next().setTrashed(true);

            folder.createFile(chunkBlob);

            // Se non è l'ultimo chunk, confermiamo la ricezione e usciamo
            if (chunkIndex < totalChunks - 1) {
                return respondChunkOk(chunkIndex);
            }

            // --- Ultimo chunk: ricongiunzione ---
            var allBytes = [];
            for (var i = 0; i < totalChunks; i++) {
                var name = "tmp_" + uploadId + "_" + i;
                var files = folder.getFilesByName(name);
                if (!files.hasNext()) return respondError("Chunk " + i + " mancante durante la ricongiunzione.");
                var tmpFile = files.next();
                var bytes = tmpFile.getBlob().getBytes();
                for (var b = 0; b < bytes.length; b++) allBytes.push(bytes[b]);
                tmpFile.setTrashed(true); // pulizia
            }

            var finalBlob = Utilities.newBlob(allBytes, mimeType, fileName);
            var finalFile = folder.createFile(finalBlob);

            try {
                MailApp.sendEmail({
                    to: NOTIFICATION_EMAIL,
                    subject: "📼 SpoolID AI: Nuovo Video Ricevuto per il Dataset!",
                    body: "Ottimo lavoro!\n\nNome file: " + fileName + "\nLink: " + finalFile.getUrl() + "\nData: " + new Date().toLocaleString()
                });
            } catch (mailError) {
                console.error("Errore invio notifica email video: " + mailError);
            }

            return respondSuccess({ message: "Video caricato con successo sul Drive", fileUrl: finalFile.getUrl() });
        }

        // Azione sconosciuta
        else {
            return respondError("Azione non supportata (" + action + ")");
        }

    } catch (error) {
        return respondError(error.toString());
    }
}

function respondSuccess(data) {
    var response = { status: "success", data: data };
    return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}

function respondChunkOk(index) {
    var response = { status: "chunk_ok", chunk: index };
    return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}

function respondError(errorMessage) {
    var response = { status: "error", message: errorMessage };
    return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}
