import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { countries, townships } from './data/townships';
import React, { useState, useRef } from 'react';
import companyData from './data/company.json';
import './MyMap.css';

const skater = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
    iconSize: [26, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
});

function MyMap() {
    const [countryIndex, setCountryIndex] = useState(-1);
    const [townshipIndex, setTownshipIndex] = useState(-1);
    const [companyShowInfo, setCompanyShowInfo] = useState(
        companyData.features
    );
    // console.log(countries);

    const countySelect = (e) => {
        // console.log(countries[e.target.value]);
        const newShowInfo = companyData.features.filter((v) => {
            // console.log(v.County);
            return v.County === countries[e.target.value];
        });

        // console.log(newShowInfo);
        setCompanyShowInfo(newShowInfo);
    };

    const mapRef = useRef();

    function handleOnFlyTo(i) {
        const { current = {} } = mapRef;
        const { leafletElement: map } = current;
        // console.log(companyData.features);
        // console.log(i);
        const disneyLandLatLng = [
            companyShowInfo[i].Latitude,
            companyShowInfo[i].Longitude,
        ];
        // console.log(disneyLandLatLng);

        map.flyTo(disneyLandLatLng, 15, {
            duration: 2,
        });
    }
    function handleOnFlyToMark(latitude, longitude) {
        const { current = {} } = mapRef;
        const { leafletElement: map } = current;
        // console.log(companyData.features);
        // console.log(i);
        const disneyLandLatLng = [latitude, longitude];
        // console.log(disneyLandLatLng);

        map.flyTo(disneyLandLatLng, 15, {
            duration: 2,
        });
    }
    return (
        <>
            <div className="row no-gutter w-100">
                <div className="col-sm-6 col-md-4 col-xl-3 bg-w l_menu">
                    <form className="ml-3 mt-4 mb-3">
                        <div className="d-flex form-row select px-4 ">
                            <div className="" style={{ width: '100vh' }}>
                                <label htmlFor="citys">選擇縣市</label>
                                <select
                                    className="form-control jscounty"
                                    value={countryIndex}
                                    onChange={(e) => {
                                        setCountryIndex(Number(e.target.value));
                                        countySelect(e);

                                        setTownshipIndex(-1);
                                    }}
                                >
                                    <option className="text-center" value="-1">
                                        請選擇縣市
                                    </option>
                                    {countries.map((v, i) => {
                                        return (
                                            <option
                                                className="text-center"
                                                key={i}
                                                value={i}
                                            >
                                                {v}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </form>
                    <section
                        className="content bg-w overflow-auto  px-3 pt-3 mx-2"
                        style={{ height: '68vh' }}
                    >
                        {companyShowInfo.map((v, i) => {
                            return (
                                // CSS 更動
                                <div
                                    className="pinmycard card mb-3 infocards"
                                    data-cards="241"
                                    key={v.QualityFarmID}
                                >
                                    <h5 className="title m-3">{v.FarmNm_CH}</h5>
                                    <img src={v.Photo} />
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-action">
                                            電話：{v.TEL}
                                        </li>
                                        <li className="list-group-item list-group-item-action">
                                            地址：{v.Address_CH}
                                        </li>
                                        <li className="list-group-item list-group-item-action">
                                            營業時間： {v.Time3}
                                        </li>
                                    </ul>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => {
                                            handleOnFlyTo(i);
                                        }}
                                    >
                                        立即查詢
                                    </button>
                                </div>
                            );
                        })}
                    </section>
                </div>
                <div className="col-sm-6 col-md-8 col-xl-9 px-0 d-none d-lg-block">
                    <div>
                        <Map ref={mapRef} center={[23.645, 121.064]} zoom={8}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {companyData.features.map((company) => (
                                <Marker
                                    key={company.QualityFarmID}
                                    position={[
                                        company.Latitude,
                                        company.Longitude,
                                    ]}
                                    icon={skater}
                                    onClick={(i) => {
                                        handleOnFlyToMark(
                                            company.Latitude,
                                            company.Longitude
                                        );
                                    }}
                                >
                                    <Popup
                                        position={[
                                            company.Latitude,
                                            company.Longitude,
                                        ]}
                                    >
                                        <div>
                                            <h4 className="text-center">
                                                {company.FarmNm_CH}
                                            </h4>
                                            <p>{'電話： ' + company.TEL}</p>
                                            <p>
                                                {'地址： ' + company.Address_CH}
                                            </p>

                                            <ul class="list-group list-group-flush">
                                                營業時間：
                                                <li class="list-group ps-3 pt-1">
                                                    {company.Time1}
                                                </li>
                                                <li class="list-group ps-3">
                                                    {company.Time2}
                                                </li>
                                                <li class="list-group ps-3">
                                                    {company.Time3}
                                                </li>
                                                <li class="list-group ps-3">
                                                    {company.Time4}
                                                </li>
                                                <li class="list-group ps-3">
                                                    {company.Time5}
                                                </li>
                                                <li class="list-group ps-3">
                                                    {company.Time6}
                                                </li>
                                                <li class="list-group ps-3">
                                                    {company.Time7}
                                                </li>
                                            </ul>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </Map>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyMap;
