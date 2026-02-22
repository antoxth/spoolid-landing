/**
 * SPOOLID BACKEND API
 * 
 * Questo script serve per ricevere upload di video e iscrizioni alla newsletter
 * direttamente dalla landing page di SpoolID, aggirando il login obbligatorio di Google Forms.
 */

// ==========================================
// 🔴 CONFIGURAZIONE INIZIALE OBBLIGATORIA 🔴
// ==========================================

// 1. Crea una cartella nel tuo Google Drive dove verranno salvati i video.
// 2. Apri la cartella e copia l'ID dall'URL.
// Es: Se l'URL è https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqrStUvWxYz_12345
// L'ID è: 1aBcDeFgHiJkLmNoPqrStUvWxYz_12345
const FOLDER_ID = "INSERISCI_QUI_L_ID_DELLA_CARTELLA_DRIVE";

// 1. Crea un nuovo Foglio di lavoro su Google Sheets o usane uno esistente.
// 2. Copia l'ID dall'URL.
// Es: Se l'URL è https://docs.google.com/spreadsheets/d/1XyZ_aBcDeFgHiJkLmNoPqrStUvWxYz_12345/edit
// L'ID è: 1XyZ_aBcDeFgHiJkLmNoPqrStUvWxYz_12345
const SPREADSHEET_ID = "INSERISCI_QUI_L_ID_DEL_FOGLIO_GOOGLE";

// ==========================================
// ⚙️ CODICE DI SISTEMA (Non Modificare) ⚙️
// ==========================================

// Gestisce le richieste pre-flight del browser (CORS)
function doOptions(e) {
    return ContentService.createTextOutput("")
        .setMimeType(ContentService.MimeType.TEXT)
        .setHeader("Access-Control-Allow-Origin", "*")
        .setHeader("Access-Control-Allow-Methods", "POST")
        .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// Riceve la richiesta effettiva dalla landing page
function doPost(e) {
    try {
        // Il sito web invia i dati come stringa JSON
        var payload;
        try {
            payload = JSON.parse(e.postData.contents);
        } catch (parseError) {
            return respondError("I dati inviati non sono nel formato JSON corretto.");
        }

        var action = payload.action;

        // AZIONE 1: Iscrizione Newsletter
        if (action === "newsletter") {
            var email = payload.email;
            if (!email) return respondError("Email mancante.");

            if (SPREADSHEET_ID === "INSERISCI_QUI_L_ID_DEL_FOGLIO_GOOGLE") {
                return respondError("ATTENZIONE: Devi inserire il tuo SPREADSHEET_ID nello script su Google!");
            }

            var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
            // Aggiunge una riga con la data corrente e l'email
            sheet.appendRow([new Date(), email]);

            return respondSuccess("Email salvata con successo.");
        }

        // AZIONE 2: Upload Video
        else if (action === "upload_video") {
            var fileData = payload.fileData; // Il video in formato Base64
            var fileName = payload.fileName || ("SpoolVideo_" + new Date().getTime() + ".mp4");
            var mimeType = payload.mimeType || "video/mp4";

            if (!fileData) return respondError("Nessun frammento video ricevuto.");
            if (FOLDER_ID === "INSERISCI_QUI_L_ID_DELLA_CARTELLA_DRIVE") {
                return respondError("ATTENZIONE: Devi inserire il tuo FOLDER_ID nello script su Google!");
            }

            var folder = DriveApp.getFolderById(FOLDER_ID);

            // Decodifica il video dal fomato web Base64 a file binario e lo salva su Drive
            var decodedFile = Utilities.base64Decode(fileData.split(',')[1] || fileData);
            var blob = Utilities.newBlob(decodedFile, mimeType, fileName);
            var file = folder.createFile(blob);

            return respondSuccess({
                message: "Video caricato con successo sul Drive",
                fileUrl: file.getUrl()
            });
        }

        // Azione sconosciuta
        else {
            return respondError("Azione non supportata (" + action + ")");
        }

    } catch (error) {
        // Raccoglie errori generici (es. permessi)
        return respondError(error.toString());
    }
}

// Helper per confezionare le risposte di successo
function respondSuccess(data) {
    var response = { status: "success", data: data };
    return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}

// Helper per confezionare le risposte di errore
function respondError(errorMessage) {
    var response = { status: "error", message: errorMessage };
    return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}
