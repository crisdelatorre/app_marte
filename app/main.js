
window.onload = () => {
    getData();
    initEvents();
    todaysImage();

}

let globalData = [];

async function getData() {
    fetch('https://mars-weather-rems.netlify.app/rems.json')
        .then(rems => rems.json())
        .then(data => {

            /**
             * DECLARACIÓN DE VARIABLES DEL HTML
             */

            const weatherIcon = document.querySelector(".weather_icon");

            const tempPill = document.querySelector(".temperature");

            const martianDate = document.querySelector(".sol_count");
            const weatherStatus = document.querySelector(".weather_status");
            const martianSunTime = document.querySelector(".sun_time");

            const secondaryData = document.querySelector(".secondary_measurements");

            const uvData = document.querySelector(".uv_info");

            const saveButton = document.querySelector(".save_button");

            /**
             * PINTADO DE DATOS
             */


            // PASTILLA DE TEMPERATURA

            let temperatureInfo = `
            <div class="air_temp">
                    <div class="air_max">${data.weather_report.magnitudes[0].max_temp}º</div>
                    <div class="air_min">${data.weather_report.magnitudes[0].min_temp}º</div>
                </div>

                <div class="middle_element">
                    <div class="air">AIR</div>
                    <div class="line"></div>
                    <div class="ground">GROUND</div>
                </div>

                <div class="ground_temp">
                    <div class="ground_max">${data.weather_report.magnitudes[0].max_gts_temp}º</div>
                    <div class="ground_min">${data.weather_report.magnitudes[0].min_gts_temp}º</div>
                </div>
            `;

            tempPill.innerHTML += temperatureInfo;

            // DÍA MARCIANO

            let solCount = `
            <p>SOL: ${data.weather_report.sol}</p>
            `;

            martianDate.innerHTML += solCount;


            // ESTADO DEL TIEMPO

            let weatherInfo = `
            <p> WEATHER STATUS: ${data.weather_report.magnitudes[0].atmo_opacity}</p>
            `;

            weatherStatus.innerHTML += weatherInfo;

            // HORAS SOLARES MARCIANAS

            let martianTime = `
                <div class="sunrise_time">${data.weather_report.magnitudes[0].sunrise}</div>
                <div class="sunset_time">${data.weather_report.magnitudes[0].sunset}</div>
            `;

            martianSunTime.innerHTML += martianTime;

            // MEDIDAS SECUNDARIAS

            let secondaryMeasurements = `
            <div class="wind_info outlined_component"> WIND:
                <div class="wind_data">${data.weather_report.magnitudes[0].wind_speed} m/s</div>
            </div>

            <div class="preassure_info outlined_component"> PREASSURE:
                <div class="preassure_data">${data.weather_report.magnitudes[0].pressure} Pa</div>

            </div>

            <div class="humidity_info outlined_component"> HUMIDITY:
                <div class="humidity_data">${data.weather_report.magnitudes[0].abs_humidity} %</div>

            </div>
            `;

            secondaryData.innerHTML += secondaryMeasurements;


            // RADIACIÓN UV

            let uvInfo = `
                <div class="name">UV LEVEL:</div>
                <div class="uv_data"> ${data.weather_report.magnitudes[0].local_uv_irradiance_index}</div>
            `;

            uvData.innerHTML += uvInfo;


            /**
             * GUARDADO DE DATOS *********************************************
             */

            let savedMeasurements = [];

            saveButton.addEventListener('click', () => {

                let todaysData = {
                    sol: data.weather_report.sol,
                    luna: data.weather_report.sol,
                    lol: data.weather_report.sol,
                };

                savedMeasurements.push(todaysData);

                console.log(savedMeasurements);

                localStorage.setItem('savedMeasurements', JSON.stringify(savedMeasurements));

                console.log("saving");

                renderData();

            });

            function renderData() {
                savedMeasurements = JSON.parse(localStorage.getItem('savedMeasurements'));

                console.log("working");

                const archiveScroll = document.querySelector(".injected_saved_data");
                console.log("hey");


                let dataInfo = `
                    <div class="data_component">

                        <div class="day_date">02/02/2021</div>

                        <div class="day_data_table">
                            <div class="sol_name table_item col_1">SOL</div>
                            <div class="sol_data table_item">
                                <div class="data_try">prueba</div>
                            </div>

                            <div class="weatherstat_name table_item col_1"> WEATHER STATUS</div>
                            <div class="weatherstat_data table_item">${savedMeasurements.sol}</div>

                            <div class="atmax_name table_item col_1">AIR TEMP MAX</div>
                            <div class="atmax_data table_item"></div>

                            <div class="atmin_name table_item col_1">AIR TEMP MIN</div>
                            <div class="atmin_data table_item"></div>

                            <div class="gtmax_name table_item col_1">GROUND TEMP MAX</div>
                            <div class="gtmax_data table_item"></div>

                            <div class="gtmin_name table_item col_1">GROUND TEMP MIN</div>
                            <div class="gtmin_data table_item">1</div>

                            <div class="wind_name table_item col_1">WIND</div>
                            <div class="wind_data table_item">1</div>

                            <div class="preassure table_item col_1">PREASSURE</div>
                            <div class="preasssure_data table_item">1</div>

                            <div class="humidity_name table_item col_1"> HUMIDITY</div>
                            <div class="humidity_data table_item">1</div>

                            <div class="uv_radiation_name table_item col_1">RADIATION</div>
                            <div class="uv_radiation_data table_item">1</div>

                            <div class="warnings_name table_item col_1">WARNING</div>
                            <div class="warnings_data table_item">1</div>
                        </div>

                    </div>
                `;

                archiveScroll.innerHTML += dataInfo;
                console.log("done");

            }

        });

}

function initEvents() {
    const homeButton = document.querySelector(".home");
    const seeDataButton = document.querySelector(".see_data_button");
    const archiveOverlay = document.querySelector(".data_archive_overlay");
    const saveDataButton = document.querySelector(".save_button");
    const confirmOverlay = document.querySelector('.confirmation_popup');
    const okButton = document.querySelector('.ok_button');
    const menuDataIcon = document.querySelector(".data_icon");
    
    seeDataButton.addEventListener('click', () => {
        archiveOverlay.classList.remove('closed');
        archiveOverlay.classList.add('opened');
    });

    menuDataIcon.addEventListener('click', () => {
        archiveOverlay.classList.remove('closed');
        archiveOverlay.classList.add('opened');
    });

    homeButton.addEventListener('click', () => {
        archiveOverlay.classList.remove('opened');
        archiveOverlay.classList.add('closed');
    });

    saveDataButton.addEventListener('click', () => {
        confirmOverlay.classList.remove('closed');
        confirmOverlay.classList.add('opened');
    });

    okButton.addEventListener('click', () => {
        confirmOverlay.classList.remove('opened');
        confirmOverlay.classList.add('closed');
    });
};

function todaysImage() {
    let myApiKey = "Vs4ElzZPPoXfFPfYhrNitJJuN1xaQhSfpViLjRoF";

    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${myApiKey}`)
        // Convierte la base de datos a objeto json de javascrip
        .then(data => data.json())
        // genera una variable en la que incluye los datos del json
        .then(apiPhotos => {

            renderPreview();
            function renderPreview() {
            const todaysPrev = document.querySelector(".pic_of_the_day");
    
                    let previewPic = `
                        <a href="">
                            <div class="pic_img">
                                <div class="api_img">
                                <img src="${apiPhotos.photos[279].img_src}" alt="">
                                </div>
                                <div class="img_filter"></div>
                            </div>
                            <div class="element_tittle">PIC OF THE DAY</div>
                        </a>
                    `;

                    todaysPrev.innerHTML += previewPic;
            }

            renderImg();

            function renderImg() {
                const todaysImage = document.querySelector(".todays_pic");
    
                    let pic = `
                        <img src="${apiPhotos.photos[279].img_src}" alt="">
                    `;

                    todaysImage.innerHTML += pic;
            }

        });
}