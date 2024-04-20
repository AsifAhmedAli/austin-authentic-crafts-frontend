var request;

$("#song_request").submit(function (event) {
  // Prevent default posting of form - put here to work in case of errors
  event.preventDefault();

  // Abort any pending request
  if (request) {
    request.abort();
  }
  // var token = localStorage.getItem('token');
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var insta_url = document.getElementById("insta_url").value;
  var songinput = document.getElementById("songinput").value;

  data = {
    name: name,
    email: email,
    insta_url: insta_url,
    songinput: songinput,
  };
  // console.log(data);
  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "post",
    data: data,
    url: `${baseurl}/user/new-request`,
    success: function (response) {
      console.log(response);
      if(response.mid){
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Request Sent",
          allowOutsideClick: false,
        });
        $("button.swal2-confirm").click(function () {
          window.location.reload();
        });
      }
      document.getElementById("loader1").style.visibility = "hidden";
    },
    error: function (response) {
      console.log(response);
      //   if (response.status == 500) {
          Swal.fire({
            title: "Error!",
            text: "Internal Server Error",
            icon: "error",
          });
          document.getElementById("loader1").style.visibility = "hidden";
      //   }
    },
  });
});

document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/get-image-name/`,
  success: function (result) {
    // console.log(result);
    document.getElementById("current_image").src = result.dataUrl;
    document.getElementById("loader1").style.visibility = "hidden";
    // $("#showhere").html(result);
  },
  error: function (error) {
    // console.log(error)
    document.getElementById("loader1").style.visibility = "hidden";
  },
});
document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/get-texts/`,
  success: function (result) {
    // console.log(result.texts[0]);
    document.getElementById("main_heading").innerText =
      result.texts[0].main_heading;
    document.getElementById("area").innerText = result.texts[0].area;
    document.getElementById("status").innerText = result.texts[0].status;
    document.getElementById("paragraph").innerText = result.texts[0].paragraph;
    document.getElementById("loader1").style.visibility = "hidden";
    // $("#showhere").html(result);
  },
  error: function (error) {
    // console.log(error)
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

function fetch_songslist(songinput) {
  var input = songinput.value;
  // alert(input);
  if (input == "") {
    document.getElementById("restuls").innerHTML = "";
  } else {
    document.getElementById("loader1").style.visibility = "visible";
    $.ajax({
      type: "post",
      url: `${baseurl}/admin/fetch-tracks/search?q=${input}`,
      success: function (result) {
        var id_setup = 0;
        var comma = "";
        document.getElementById("restuls").innerHTML = "";
        result.items.forEach((element) => {
          // console.log(element);
          document.getElementById(
            "restuls"
          ).innerHTML += `<li class="list-group-item" onclick="movevaluetoinput(this)">${element.name}
          <br><small id="id${id_setup}"></small>
          </li>`;
          element.artists.forEach((element1, index, array) => {
            if (index === array.length - 1) {
              document.getElementById(`id${id_setup}`).innerHTML += element1.name;
            }
            else{
              document.getElementById(`id${id_setup}`).innerHTML += element1.name + comma;
            }
          })
          id_setup++;
          comma = ", ";
        });
        // console.log(result);
        document.getElementById("loader1").style.visibility = "hidden";
        // $("#showhere").html(result);
      },
      error: function (error) {
        // console.log(error)
        document.getElementById("loader1").style.visibility = "hidden";
      },
    });
  }
}

function movevaluetoinput(x) {
  document.getElementById("songinput").value = x.innerText;
}
