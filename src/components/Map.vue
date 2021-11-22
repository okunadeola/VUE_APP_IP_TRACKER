<template>
  <div>
    <div class="containerBox">
      <div class="imageConatainer">
        <div class="header">
          <div class="title">IP Address Tracker</div>

          <div class="inputContainer">
            <input
              class="input"
              type="text"
              v-model="ip"
              placeholder="Search for any IP address or domain"
            />
            <div class="search" @click="getMap(ip)">
              <span class="icon">></span>
            </div>
          </div>

          <div class="infoContainer">
            <div class="row rowFlex">
              <div class="col-12 col-md-3 mb-2">
                <div class="infoTitle text-muted">IP ADDRESS</div>
                <div class="infoMessage">{{ info.ip }}</div>
              </div>

              <div class="col-12 col-md-3 mb-2">
                <div class="infoTitle text-muted">Location</div>
                <div class="infoMessage">
                  {{ location.region + "," }} {{ location.country }}
                </div>
              </div>

              <div class="col-12 col-md-3 mb-2">
                <div class="infoTitle text-muted">TimeZone</div>
                <div class="infoMessage">{{ location.timezone }}</div>
              </div>
              <div class="col-12 col-md-3 mb-2">
                <div class="infoTitle text-muted">ISP</div>
                <div class="infoMessage">{{ info.isp }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div id="mapContainer"></div>
    </div>
  </div>
</template>









<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

export default {
  name: "Map",
  data() {
    return {
      ip: "",
      lat: "",
      lng: "",
      info: {},
      location: "",
    };
  },

  methods: {
    setMap(lat, lng) {
      var greenIcon = L.icon({
        iconUrl: require("@/assets/marker.svg"),
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      });

      var mymap = L.map("mapContainer").setView([lat, lng], 13);
      L.tileLayer(
        `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_TOKEN}`,
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.VUE_APP_TOKEN,
        }
      ).addTo(mymap);
      L.marker([lat, lng], { icon: greenIcon }).addTo(mymap);
    },

    async getMap(ip) {
      await axios
        .get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.VUE_APP_IP_KEY}&ipAddress=${ip}`
        )
        .then((result) => {
          this.info = result.data;
          this.location = this.info.location;
          this.lng = result.data.location.lng;
          this.lat = result.data.location.lat;

          if (L.DomUtil.get("mapContainer") !== undefined) {
            L.DomUtil.get("mapContainer")._leaflet_id = null;
          }
          
          this.setMap(this.lat, this.lng);
          this.ip = "";
        })
        .catch((err) => {
          alert(
            err,
            "something went wrong, check the ip address and try again"
          );
        });
    },
  },

  async mounted() {
    await axios.get("https://api64.ipify.org/?format=json").then((res) => {
      if (res.data) {
        this.ip = res.data.ip;
        this.getMap(this.ip);
      }
    });
  },
};
</script>



<style>
#mapContainer {
  min-width: 100vh !important;
  min-height: 100vh !important;
}

.containerBox {
  display: flex;
  justify-content: center;
  width: 100%;
}
.imageConatainer {
  width: 100% !important;
  background-image: url("../assets/pattern-bg.png");
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  flex-direction: column;
  width: 100%;
}
.title {
  font-size: 30px;
  font-weight: 500;
  color: white;
  margin-bottom: 10px;
}

.inputContainer {
  text-align: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  min-width: 50%;
  background-color: white;
  position: relative;
}

.input {
  flex: 1;
  padding: 10px;
  width: 100%;
  border-radius: 20px;
}

.search {
  background-color: black;
  padding: 5px 25px;
  border-radius: 0 20px 20px 0;
  color: white;
  position: absolute;
  right: 0;
  cursor: pointer;
}

.search:hover {
  background-color: rgb(82, 77, 77);
}
.icon {
  font-size: 25px;
}

.infoContainer {
  width: 70%;
  background-color: white;
  height: auto;
  position: absolute;
  flex-wrap: wrap;
  top: 23%;
  z-index: 9999;
  border-radius: 20px;
  padding: 20px 20px;
  box-shadow: 0 0 2px 5px white;
}

.rowFlex {
  display: flex;

  justify-content: center;
  height: 100%;
}
.infoMessage {
  font-weight: bolder;
  font-size: 16px;
}
.infoTitle {
  font-size: 12px;
}

@media only screen and (max-width: 480px) {
  .imageConatainer {
    text-align: center;
  }
  .inputContainer {
    width: 80%;
  }
  .title {
    font-size: 20px;
    font-weight: 300;
  }

  .input {
    padding: 5px;
  }

  .search {
    padding: 0px 15px;
  }
}
</style>
