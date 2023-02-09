import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { addTileLayer, defaultAddress, getAddress, getUserIp, validateIp } from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const error = document.querySelector('.error');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');
const info = document.querySelector('.info');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
});
const mapArea = document.querySelector('.map');
const map = L.map(mapArea, { zoomControl: false }).setView([defaultAddress.lat, defaultAddress.lng], 13);
addTileLayer(map);
L.marker([defaultAddress.lat, defaultAddress.lng], { icon: markerIcon }).addTo(map);

function getData() {
    const ip = ipInput.value.trim();
    if (validateIp(ip)) {
        error.classList.remove('show');
        getAddress(ip).then(setInfo);
    } else {
        error.classList.add('show');
    }
}

function handleKey(event) {
    if (event.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    const { lat, lng, country, region, timezone } = mapData.location;

    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = country + ' ' + region;
    timezoneInfo.innerText = timezone;
    ispInfo.innerText = mapData.isp;
    info.classList.add('show');
    mapArea.classList.add('show');

    map.setView([lat, lng]);
    L.marker([lat, lng], { icon: markerIcon }).addTo(map);
}

document.addEventListener('DOMContentLoaded', () => {
    getUserIp().then((ip) => {
        if (validateIp(ip)) {
            getAddress(ip).then(setInfo);
        } else {
            getAddress(defaultAddress.ip).then(setInfo);
        }
    });
});
