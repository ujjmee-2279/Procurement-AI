import React, { createContext, useState, useContext } from 'react';

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
    const [vendorData, setVendorData] = useState([
        {
            "vendor": "Caterpillar (U.S.) - Caterpillar",
            "Equipment": "Excavator",
            "Model": "CAT 320\t",
            "Engine Power (HP)": 172,
            "Operating Weight (kg)": 21200,
            "Bucket Capacity (m³)": 1.19,
            "Max Digging Depth (m)": 6.57,
            "Max Reach (m)": 10.87,
            "Fuel Type": "Diesel",
            "Manufacturer": "Caterpillar",
            "Year": 2023,
            "Quality": "Good",
            "Lead Time": 15,
            "Price": "5,29,722",
            "Country_Code": "Andorra",
            "email_id": "karan@sanskartechnolab.com"
        },
        {
            "vendor": "Caterpillar (U.S.) - Caterpillar",
            "Equipment": "Bulldozer",
            "Model": "Komatsu D65PX",
            "Engine Power (HP)": 218,
            "Operating Weight (kg)": 21140,
            "Bucket Capacity (m³)": 2.19,
            "Max Digging Depth (m)": 4.5,
            "Max Reach (m)": 11.2,
            "Fuel Type": "Diesel",
            "Manufacturer": "Komatsu D65PX",
            "Year": 2022,
            "Quality": "Poor",
            "Lead Time": 10,
            "Price": "7,90,412",
            "Country_Code": "India"
        },
        {
            "vendor": "Caterpillar (U.S.) - Caterpillar",
            "Equipment": "Asphalt Paver",
            "Model": "Volvo ABG7820",
            "Engine Power (HP)": 174,
            "Operating Weight (kg)": 14300,
            "Bucket Capacity (m³)": "12.5 (Hopper)",
            "Max Digging Depth (m)": 6.8,
            "Max Reach (m)": 9,
            "Fuel Type": "Diesel",
            "Manufacturer": "Volvo",
            "Year": 2018,
            "Quality": "Medium",
            "Lead Time": 18,
            "Price": "8,34,087",
            "Country_Code": "Andorra"
        },
        {
            "vendor": "Komatsu (Japan) - Komatsu",
            "Equipment": "Concrete Mixer",
            "Model": "McNeilus 350",
            "Engine Power (HP)": 350,
            "Operating Weight (kg)": 13000,
            "Bucket Capacity (m³)": "10.5 (Drum)",
            "Max Digging Depth (m)": 5.8,
            "Max Reach (m)": 13.6,
            "Fuel Type": "Diesel",
            "Manufacturer": "McNeilus",
            "Year": 2021,
            "Quality": "Poor",
            "Lead Time": 22,
            "Price": "34,67,092",
            "Country_Code": "United Arab Emirates"
        },
        {
            "vendor": "Komatsu (Japan) - Komatsu",
            "Equipment": "Crane",
            "Model": "Volvo ABG7820",
            "Engine Power (HP)": 174,
            "Operating Weight (kg)": 14300,
            "Bucket Capacity (m³)": "12.5 (Hopper)",
            "Max Digging Depth (m)": 6.8,
            "Max Reach (m)": 9,
            "Fuel Type": "Diesel",
            "Manufacturer": "Volvo",
            "Year": 2018,
            "Quality": "Good",
            "Lead Time": 21,
            "Price": "8,93,924",
            "Country_Code": "Afghanistan"
        },
        {
            "vendor": "XCMG (China) - Xuzhou Construction Machinery Group (XCMG)",
            "Equipment": "Backhoe Loader",
            "Model": "JCB 3CX",
            "Engine Power (HP)": 74.5,
            "Operating Weight (kg)": 8340,
            "Bucket Capacity (m³)": "1.0 (Loader)",
            "Max Digging Depth (m)": "4.24 (Backhoe)",
            "Max Reach (m)": "6.51 (Backhoe)",
            "Fuel Type": "Diesel",
            "Manufacturer": "JCB",
            "Year": 2023,
            "Quality": "Medium",
            "Lead Time": 33,
            "Price": "9,54,789",
            "Country_Code": "Afghanistan"
        },
        {
            "vendor": "XCMG (China) - Xuzhou Construction Machinery Group (XCMG)",
            "Equipment": "Skid Steer Loader",
            "Model": "Bobcat S650",
            "Engine Power (HP)": 74.3,
            "Operating Weight (kg)": 3624,
            "Bucket Capacity (m³)": 3.5,
            "Max Digging Depth (m)": 4.35,
            "Max Reach (m)": 7.9,
            "Fuel Type": "Diesel",
            "Manufacturer": "Bobcat",
            "Year": 2016,
            "Quality": "Poor",
            "Lead Time": 28,
            "Price": "57,52,902",
            "Country_Code": "Afghanistan"
        },
        {
            "vendor": "XCMG (China) - Xuzhou Construction Machinery Group (XCMG)",
            "Equipment": "Crane",
            "Model": "Liebherr LTM",
            "Engine Power (HP)": 516,
            "Operating Weight (kg)": 48000,
            "Bucket Capacity (m³)": 5.5,
            "Max Digging Depth (m)": 3.7,
            "Max Reach (m)": 60,
            "Fuel Type": "Diesel",
            "Manufacturer": "Liebherr",
            "Year": 2019,
            "Quality": "Good",
            "Lead Time": 1,
            "Price": "45,78,301",
            "Country_Code": "Antigua and Barbuda"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = vendorData.filter(vendor =>
        vendor.Equipment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const finalData = filteredData
        .filter((item) => item.Quality.toLowerCase() !== "poor")
        .reduce((preferred, item) => {
            const itemPrice = parseInt(item.Price.replace(/,/g, ""));
            const preferredPrice = parseInt(preferred.Price.replace(/,/g, ""));

            if (itemPrice < preferredPrice) {
                return item;
            }

            if (itemPrice === preferredPrice) {
                if (item["Lead Time"] < preferred["Lead Time"]) {
                    return item;
                }

                if (item["Lead Time"] === preferred["Lead Time"]) {
                    const qualityOrder = { Good: 3, Medium: 2, Poor: 1 };
                    if (qualityOrder[item.Quality] > qualityOrder[preferred.Quality]) {
                        return item;
                    }
                }
            }

            return preferred;
        }, filteredData[0]);

    const displayedData = searchTerm ? [finalData] : vendorData;

    return (
        <VendorContext.Provider value={{ vendorData: displayedData, setVendorData, searchTerm, setSearchTerm }}>
            {children}
        </VendorContext.Provider>
    );
};

export const useVendor = () => useContext(VendorContext);