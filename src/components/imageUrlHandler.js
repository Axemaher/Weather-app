
export function imageUrlHandler(dayTime, weatherId) {
    let imgName = "";
    if (weatherId >= 200 && weatherId <= 211) { imgName = "thunderstorm"; }
    else if (weatherId >= 212 && weatherId <= 232) { imgName = "heavy_thunderstorm"; }
    else if (weatherId >= 500 && weatherId <= 504) { imgName = "rain"; }
    else if (weatherId >= 511 && weatherId <= 531) { imgName = "heavy_rain"; }
    else if (weatherId >= 600 && weatherId <= 615) { imgName = "snow"; }
    else if (weatherId >= 616 && weatherId <= 622) { imgName = "heavy_snow"; }
    else if (weatherId === 701 || weatherId === 721) { imgName = "mist"; }
    else if (weatherId === 800) { imgName = "clear_sky"; }
    else if (weatherId === 801 || weatherId === 802) { imgName = "scattered_clouds"; }
    else if (weatherId === 803 || weatherId === 804) { imgName = "broken_clouds"; }
    return require(`../icons/${dayTime}/${imgName}.png`)
}
