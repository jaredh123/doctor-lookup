import $ from 'jquery';

export default class DoctorLookup {
  constructor(doctorName, medicalIssue) {
    this.doctorName = doctorName;
    this.medicalIssue = medicalIssue;
  }

  findDoctors() {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = "";
      let that = this;
      if (this.doctorName != "" && this.medicalIssue != "") {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${this.doctorName}&query=${that.condition}&location=or-portland&skip=0&user_key=${process.env.exports.apiKey}`;
      }
      else if (this.doctorName == "") {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${that.medicalIssue}&location=or-portland&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      }
      else {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${this.doctorName}&location=or-portland&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      }
      request.onload = function() {
        if (this.status == 200) {
          resolve(request.response);
        }
        else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    })
  }
}
