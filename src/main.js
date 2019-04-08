import DoctorLookup from "./doctorLookup.js";
import $ from 'jquery';
import 'bootstrap';
import './styles.css';

$(document).ready(function() {
  $("#run").submit(function(event) {
    event.preventDefault();

    let doctorName = $("#doctorName").val();
    let medicalIssue = $("#medicalIssue").val();

    let doctorLookup = new DoctorLookup(doctorName, medicalIssue);

    let promise = doctorLookup.findDoctors();
    $(".results").empty();
    $(".result").show();
    promise.then(function(response) {
      let body = JSON.parse(response);
      if (body.data.length === 0) {
        $("#errors").append("No results");
      }
      else {
        for (let i = 0; i < body.data.length; i++) {
          if (body.data[i].practices.length > 0) {
            $(".doctorInfo").append(`<div>` + `<p>Name: ${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</p>` + `<p>Address: ${body.data[i].practices[0].visit_address.street}, ${body.data[i].practices[0].visit_address.street2}, ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state}, ${body.data[i].practices[0].visit_address.zip}</p>` + `<p>Website: ${body.data[i].practices[0].website}</p>` + `<p>Accepts New Patients: ${body.data[i].practices[0].accepts_new_patients}</p>` + `</div>` + `<br>`);
          }
        }
      }
    }).catch((reason) => {
      $("#error").empty();
      $("#error").append(`${reason}`)
    })
  });
});
