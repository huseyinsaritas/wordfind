import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

interface IInfoButton {
  onPress?: () => void;
  width?: string;
  color?: string;
}

export const InfoButton: React.FC<IInfoButton> = ({ onPress, width = "24px", color = "#fff" }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      {/* <Svg viewBox="0 0 80 80" width="24" height="24">
        <Path fill="#8bb7f0" d="M40,77.5C19.322,77.5,2.5,60.678,2.5,40S19.322,2.5,40,2.5S77.5,19.322,77.5,40S60.678,77.5,40,77.5 z" />
        <Path
          fill="#4e7ab5"
          d="M40,3c20.402,0,37,16.598,37,37S60.402,77,40,77S3,60.402,3,40S19.598,3,40,3 M40,2 C19.013,2,2,19.013,2,40s17.013,38,38,38s38-17.013,38-38S60.987,2,40,2L40,2z"
        />
        <Path fill="#fff" d="M40 21A3 3 0 1 0 40 27A3 3 0 1 0 40 21Z" />
        <Path fill="#fff" d="M43 56L43 31 35 31 35 33 37 33 37 56 35 56 35 58 45 58 45 56z" />
      </Svg> */}

      {/* <Svg viewBox="0 0 1024 1024" width="24" height="24" fill="#fff">
        <Path d="M512.0512 179.2a332.8 332.8 0 1 1 0 665.6 332.8 332.8 0 1 1 0-665.6z m0 51.2a281.6 281.6 0 1 0 281.6512 281.6 281.6 281.6 0 0 0-281.6-281.6z" />
        <Path d="M510.8736 665.1904a32.1536 32.1536 0 0 1-31.744-32.6144c0-18.0224 14.2336-32.6144 31.744-32.6144 17.5104 0 31.744 14.592 31.744 32.6144a32.1536 32.1536 0 0 1-31.744 32.6144zM599.4496 460.288a89.344 89.344 0 0 1-15.5648 21.8112c-6.0416 6.144-16.8448 16.384-32.4608 30.8736a131.584 131.584 0 0 0-10.3424 10.752 41.1648 41.1648 0 0 0-8.704 16.128 316.928 316.928 0 0 0-3.1744 13.5168c-2.4064 13.6704-9.984 20.48-22.6304 20.48a22.6816 22.6816 0 0 1-16.64-6.656c-4.5056-4.5056-6.7584-11.1104-6.7584-19.968 0-11.008 1.6384-20.5824 4.9152-28.672 3.328-8.0896 7.68-15.1552 13.1584-21.2992 5.4272-6.0928 12.8-13.312 22.016-21.76 8.1408-7.3728 14.0288-12.9024 17.6128-16.6912 3.584-3.7376 6.656-7.8848 9.1648-12.4928a35.4304 35.4304 0 0 0-7.5776-41.5744 40.4992 40.4992 0 0 0-29.2352-10.9056c-13.9776 0-24.2176 3.6864-30.8224 10.9568-6.6048 7.3216-12.1856 18.0224-16.7424 32.256-4.3008 14.848-12.4928 22.272-24.576 22.272a23.7056 23.7056 0 0 1-17.92-7.7824 24.2688 24.2688 0 0 1-7.3216-16.896c0-12.4416 3.84-25.088 11.5712-37.9392a90.624 90.624 0 0 1 33.8944-31.8464c14.848-8.3968 32.1024-12.5952 51.9168-12.5952 18.3808 0 34.6112 3.5328 48.64 10.5472 14.1312 7.0144 24.9856 16.5888 32.6656 28.672 7.68 12.0832 11.52 25.2416 11.52 39.424 0 11.2128-2.2016 20.992-6.6048 29.3888z" />
      </Svg> */}

      <Svg viewBox="0 0 200 200" width={width} height={width} fill={color}>
        <Path d="M 100,0 C 44.799998,0 0,44.800001 0,100 C -5.0495145e-15,155.2 44.8,200 100,200 C 155.2,200 200,155.2 200,100 C 200,44.800001 155.2,0 100,0 z M 100,12.8125 C 148.12953,12.8125 187.1875,51.870475 187.1875,100 C 187.18751,148.12953 148.12953,187.1875 100,187.1875 C 51.870478,187.18751 12.8125,148.12953 12.8125,100 C 12.8125,51.870475 51.87048,12.8125 100,12.8125 z M 101.46875,34.0625 C 96.020051,34.091649 90.817035,34.799114 86.1875,36.125 C 81.4888,37.4708 77.062102,39.608552 73.3125,42.34375 C 70.0742,44.70595 66.978801,47.734702 64.625,50.875 C 60.466,56.4238 58.164101,62.526103 57.5625,69.5625 C 57.5225,70.0301 57.492101,70.429602 57.5,70.4375 C 57.5161,70.4536 79.202202,73.125401 79.3125,73.125 C 79.3648,73.1248 79.424752,72.891497 79.59375,72.1875 C 81.53475,64.1027 85.080298,58.6671 90.5625,55.375 C 94.882,52.7811 100.36675,51.76265 106.34375,52.40625 C 109.08355,52.70125 111.55035,53.366251 113.71875,54.40625 C 116.43185,55.70745 118.90265,57.767249 120.65625,60.21875 C 122.19865,62.37515 123.12045,64.803051 123.40625,67.53125 C 123.48575,68.29035 123.4649,70.011299 123.375,70.75 C 123.1529,72.5755 122.6786,74.12795 121.875,75.71875 C 121.0682,77.31565 120.3985,78.232851 119.125,79.53125 C 117.0884,81.60785 113.93985,84.360496 108.34375,88.9375 C 104.74365,91.8819 102.30495,94.094052 100.21875,96.28125 C 95.27745,101.46185 93.02905,105.3494 91.65625,111 C 90.75135,114.7246 90.399597,118.5498 90.5,124.1875 C 90.5249,125.5883 90.562101,126.92065 90.5625,127.15625 L 90.5625,127.59375 L 112.15625,127.59375 L 112.1875,125.1875 C 112.2233,121.9237 112.3966,119.82475 112.75,117.78125 C 113.315,114.51485 114.1757,112.78395 116.6875,109.96875 C 118.2944,108.16765 120.3906,106.2071 123.625,103.5 C 128.3938,99.508696 131.7323,96.510498 134.875,93.375 C 139.7932,88.4678 142.34115,85.114697 144.15625,81.1875 C 145.58515,78.0957 146.378,75.021652 146.625,71.65625 C 146.685,70.83965 146.6858,68.626201 146.625,67.6875 C 146.1695,60.6454 143.51655,54.43505 138.46875,48.65625 C 137.67495,47.74745 135.6887,45.769001 134.75,44.9375 C 129.7902,40.544 124.0559,37.585152 117.1875,35.84375 C 113.0012,34.78235 108.96115,34.24445 103.84375,34.09375 C 103.05636,34.070563 102.24714,34.058336 101.46875,34.0625 z M 90.5625,137.65625 L 90.5625,159.65625 L 112.5625,159.65625 L 112.5625,137.65625 L 90.5625,137.65625 z" />
      </Svg>
    </TouchableOpacity>
  );
};