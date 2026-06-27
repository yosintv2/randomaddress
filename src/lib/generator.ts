import states from '../data/states.json';
import cities from '../data/cities.json';
import zipcodes from '../data/zipcodes.json';
import streets from '../data/streets.json';
import firstNames from '../data/firstNames.json';
import lastNames from '../data/lastNames.json';
import counties from '../data/counties.json';
import areaCodesData from '../data/areaCodes.json';

export interface Address {
  name: string;
  gender: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  fullAddress: string;
}

const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'icloud.com', 'protonmail.com'];

function makeEmail(firstName: string, lastName: string): string {
  const domain = pick(emailDomains);
  const num = Math.floor(Math.random() * 999);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${num}@${domain}`;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone(stateAbbr: string): string {
  const codes = (areaCodesData as Record<string, string[]>)[stateAbbr];
  const area = codes ? pick(codes) : '555';
  const prefix = String(Math.floor(Math.random() * 900) + 100);
  const line = String(Math.floor(Math.random() * 9000) + 1000);
  return `(${area})${prefix}-${line}`;
}

function getStateAbbr(stateName: string): string {
  const s = states.find(s => s.name === stateName);
  return s ? s.abbr : '';
}

function randomStreetNumber(): string {
  return String(Math.floor(Math.random() * 9999) + 1);
}

export function generateAddress(): Address {
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const streetNum = randomStreetNumber();
  const street = pick(streets);
  const cityData = pick(cities);
  const zipData = pick(zipcodes);
  const email = makeEmail(firstName, lastName);

  return {
    name: `${firstName} ${lastName}`,
    gender,
    street: `${streetNum} ${street}`,
    city: cityData.city,
    state: cityData.state,
    zip: zipData.zip,
    phone: randomPhone(getStateAbbr(zipData.state)),
    email,
    fullAddress: `${firstName} ${lastName}, ${streetNum} ${street}, ${cityData.city}, ${cityData.state} ${zipData.zip}`,
  };
}

export function generateAddressForState(stateName: string): Address {
  const stateCities = cities.filter(c => c.state === stateName);
  const stateZips = zipcodes.filter(z => z.state === stateName);
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const streetNum = randomStreetNumber();
  const street = pick(streets);
  const cityData = stateCities.length > 0 ? pick(stateCities) : pick(cities);
  const zipData = stateZips.length > 0 ? pick(stateZips) : pick(zipcodes);
  const email = makeEmail(firstName, lastName);

  return {
    name: `${firstName} ${lastName}`,
    gender,
    street: `${streetNum} ${street}`,
    city: cityData.city,
    state: cityData.state,
    zip: zipData.zip,
    phone: randomPhone(getStateAbbr(stateName)),
    email,
    fullAddress: `${firstName} ${lastName}, ${streetNum} ${street}, ${cityData.city}, ${cityData.state} ${zipData.zip}`,
  };
}

export function generateAddressForCity(cityName: string): Address {
  const cityCities = cities.filter(c => c.city.toLowerCase() === cityName.toLowerCase());
  const cityInfo = cityCities.length > 0 ? cityCities[0] : pick(cities);
  const cityZips = zipcodes.filter(z =>
    z.city.toLowerCase() === cityName.toLowerCase() && z.state === cityInfo.state
  );
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const streetNum = randomStreetNumber();
  const street = pick(streets);
  const zipData = cityZips.length > 0 ? pick(cityZips) : pick(zipcodes);
  const email = makeEmail(firstName, lastName);

  return {
    name: `${firstName} ${lastName}`,
    gender,
    street: `${streetNum} ${street}`,
    city: cityInfo.city,
    state: cityInfo.state,
    zip: zipData.zip,
    phone: randomPhone(getStateAbbr(cityInfo.state)),
    email,
    fullAddress: `${firstName} ${lastName}, ${streetNum} ${street}, ${cityInfo.city}, ${cityInfo.state} ${zipData.zip}`,
  };
}

export function generateAddressForZip(zip: string): Address {
  const zipData = zipcodes.find(z => z.zip === zip);
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const streetNum = randomStreetNumber();
  const street = pick(streets);
  const email = makeEmail(firstName, lastName);
  const city = zipData ? zipData.city : 'Unknown';
  const state = zipData ? zipData.state : 'Unknown';

  return {
    name: `${firstName} ${lastName}`,
    gender,
    street: `${streetNum} ${street}`,
    city,
    state,
    zip,
    phone: randomPhone(zipData ? getStateAbbr(zipData.state) : ''),
    email,
    fullAddress: `${firstName} ${lastName}, ${streetNum} ${street}, ${city}, ${state} ${zip}`,
  };
}

export function generateAddressForCounty(countyName: string): Address {
  const countyEntry = counties.find(c => c.name.toLowerCase() === countyName.toLowerCase());
  const stateName = countyEntry ? countyEntry.state : pick(states).name;
  return generateAddressForState(stateName);
}

export function generatePerson() {
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const cityData = pick(cities);
  const zipData = pick(zipcodes);
  const streetNum = randomStreetNumber();
  const street = pick(streets);
  const email = makeEmail(firstName, lastName);

  return {
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    gender,
    age: Math.floor(Math.random() * 70) + 18,
    street: `${streetNum} ${street}`,
    city: cityData.city,
    state: cityData.state,
    zip: zipData.zip,
    phone: randomPhone(getStateAbbr(zipData.state)),
    email,
    username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
    fullAddress: `${firstName} ${lastName}, ${streetNum} ${street}, ${cityData.city}, ${cityData.state} ${zipData.zip}`,
  };
}

export function generatePhoneNumber(stateName?: string) {
  const abbr = stateName ? getStateAbbr(stateName) : pick(states).abbr;
  return randomPhone(abbr);
}

export function generateEmail() {
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'icloud.com', 'protonmail.com'];
  const domain = pick(domains);
  const num = Math.floor(Math.random() * 100);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${num}@${domain}`;
}

export function generateUsername(): string {
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const num = Math.floor(Math.random() * 9999);
  const styles = [
    `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${num}`,
    `${lastName.toLowerCase()}${num}`,
  ];
  return pick(styles);
}

export function generateCompanyName(): string {
  const prefixes = ['Tech', 'Global', 'Prime', 'Core', 'Elite', 'Peak', 'Summit', 'Apex', 'Nova', 'Metro', 'Urban', 'Coast', 'Valley', 'Pioneer', 'Legacy'];
  const suffixes = ['Solutions', 'Group', 'Systems', 'Technologies', 'Enterprises', 'Industries', 'Partners', 'Associates', 'Services', 'Consulting', 'Corp', 'Inc', 'LLC', 'Co', 'Ventures'];
  const prefix = pick(prefixes);
  const suffix = pick(suffixes);
  return `${prefix} ${suffix}`;
}

const usIPPrefixes = [12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 52, 54, 55, 56, 57, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 96, 97, 98, 99, 100, 104, 107, 108, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 172, 173, 174, 184, 198, 199, 204, 205, 206, 207, 208, 209, 216];

export function generateIP(): string {
  const a = pick(usIPPrefixes);
  const b = Math.floor(Math.random() * 256);
  const c = Math.floor(Math.random() * 256);
  const d = Math.floor(Math.random() * 256);
  return `${a}.${b}.${c}.${d}`;
}

export function getStates() {
  return states;
}

export function getCities() {
  return cities;
}

export function getZipcodes() {
  return zipcodes;
}

export function getStreets() {
  return streets;
}

export function getCounties() {
  return counties;
}

export function getAreaCodes() {
  return areaCodesData as Record<string, string[]>;
}
