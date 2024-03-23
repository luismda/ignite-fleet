# Ignite Fleet Mobile App 🚗

<img width="264" src="https://github.com/luismda/ignite-fleet/assets/88680118/fb100eb2-ffce-40cb-b2d3-a8ef64f646d0" alt="" />
<img width="264" src="https://github.com/luismda/ignite-fleet/assets/88680118/9a24506a-6b4f-4ff5-8907-84b3262a70e1" alt="" />
<img width="264" src="https://github.com/luismda/ignite-fleet/assets/88680118/9affa7a8-42c6-4800-9a03-a9746c25eee2" alt="" />
<img width="264" src="https://github.com/luismda/ignite-fleet/assets/88680118/63cd30ee-a9b0-4035-befb-af5787e4e020" alt="" />
<img width="264" src="https://github.com/luismda/ignite-fleet/assets/88680118/e1d07a4c-a325-4400-9264-0344f68a3503" alt="" />

---

## About

This project is an offline-first mobile application developed with React Native and Expo for managing vehicle fleets. In the app, you can log in with your Google account and, after that, register the departure of a vehicle by informing the license plate and purpose. 

The application is able to obtain your current location and identify changes in location, creating a drawing on the map of the route taken with the vehicle. Finally, it is possible to record the arrival of the vehicle and view all vehicles used in a history. As the application is offline-first, it is possible to perform these functions without an internet connection, so the data will be synchronized in an online database when there is an internet connection again.

The focus of this project was to implement social authentication, offline-first and geolocation techniques. So here are some technologies used:

- React Native
- Expo
- Expo Location (get current location)
- TypeScript
- React Native Maps (display the map)
- RealmDB (manage data in offline state)
- MongoDB Atlas (manage data in online state)
- Google Cloud Platform (social authentication and maps API)

Additionally, this project was developed during [Rocketseat](https://github.com/rocketseat-education) React Native training. The project's Figma can be accessed through the link below.

[**Access the project layout in Figma**](https://www.figma.com/community/file/1233747170984378974)

## Instructions

Clone the repository:

```sh
git clone https://github.com/luismda/ignite-fleet.git
```

Create a `.env` file (following the `.env.example`) and then install dependencies:

```sh
npm i
```

Run pre build:

```sh
npx expo prebuild
```

Start app:

```sh
npm run android

# or

npm run ios
```

## Created by

Luís Miguel | [**LinkedIn**](https://www.linkedin.com/in/luis-miguel-dutra-alves/)

##

**#NeverStopLearning 🚀**