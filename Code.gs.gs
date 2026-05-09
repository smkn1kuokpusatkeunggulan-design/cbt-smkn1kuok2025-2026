const APP_NAME = "SMKN 1 KUOK CBT";

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle(APP_NAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ================= LOGIN =================

function login(username,password,role){

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if(role == "admin"){

    if(username == "admin" && password == "smk123"){
      return {
        status:true,
        role:"admin",
        nama:"ADMIN"
      };
    }

    return {status:false};
  }

  let sheet;

  if(role == "guru"){
    sheet = ss.getSheetByName("GURU");
  }

  if(role == "peserta"){
    sheet = ss.getSheetByName("PESERTA");
  }

  const data = sheet.getDataRange().getValues();

  for(let i=1;i<data.length;i++){

    if(
      data[i][0] == username &&
      data[i][1] == password
    ){

      return {
        status:true,
        role:role,
        data:data[i]
      };

    }

  }

  return {status:false};

}

// ================= GET SOAL =================

function getSoal(mapel,token){

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheet = ss.getSheetByName("SOAL");

  const data = sheet.getDataRange().getValues();

  let hasil = [];

  for(let i=1;i<data.length;i++){

    if(
      data[i][1] == mapel &&
      data[i][3] == token
    ){

      hasil.push(data[i]);

    }

  }

  return hasil;

}

// ================= SIMPAN JAWABAN =================

function simpanJawaban(data){

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheet = ss.getSheetByName("JAWABAN");

  sheet.appendRow([
    new Date(),
    data.username,
    data.mapel,
    data.no,
    data.jawaban,
    data.benar
  ]);

  return true;

}

// ================= SIMPAN NILAI =================

function simpanNilai(data){

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheet = ss.getSheetByName("NILAI");

  sheet.appendRow([
    new Date(),
    data.username,
    data.nama,
    data.kelas,
    data.mapel,
    data.nilai
  ]);

  return true;

}

// ================= TOKEN =================

function generateToken(){

  const chars = "ABCDEFGHJKLMNP123456789";

  let token = "";

  for(let i=0;i<6;i++){

    token += chars.charAt(
      Math.floor(Math.random()*chars.length)
    );

  }

  return token;

}

// ================= PELANGGARAN =================

function savePelanggaran(username,mapel,jenis){

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheet = ss.getSheetByName("PELANGGARAN");

  sheet.appendRow([
    new Date(),
    username,
    mapel,
    jenis
  ]);

  return true;

}