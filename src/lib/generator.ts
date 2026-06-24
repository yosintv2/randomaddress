import states from '../data/states.json';
import cities from '../data/cities.json';
import zipcodes from '../data/zipcodes.json';
import streets from '../data/streets.json';
import firstNames from '../data/firstNames.json';
import lastNames from '../data/lastNames.json';

export interface Address {
  name: string;
  gender: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone(stateAbbr: string): string {
  const areaCodes: Record<string, string> = {
    CA: '213', TX: '713', NY: '212', FL: '305', IL: '312',
    PA: '215', OH: '614', GA: '404', NC: '704', MI: '313',
    NJ: '201', VA: '703', WA: '206', AZ: '602', MA: '617',
    TN: '615', IN: '317', MO: '314', MD: '301', WI: '414',
    CO: '303', MN: '612', SC: '803', AL: '205', LA: '504',
    KY: '502', OR: '503', OK: '405', CT: '203', IA: '515',
    MS: '601', AR: '501', KS: '913', UT: '801', NV: '702',
    NM: '505', WV: '304', NE: '402', ID: '208', HI: '808',
    ME: '207', NH: '603', RI: '401', MT: '406', DE: '302',
    SD: '605', ND: '701', AK: '907', VT: '802', WY: '307',
  };
  const area = areaCodes[stateAbbr] || '555';
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

  return {
    name: `${firstName} ${lastName}`,
    gender,
    street: `${streetNum} ${street}`,
    city: cityData.city,
    state: cityData.state,
    zip: zipData.zip,
    phone: randomPhone(getStateAbbr(zipData.state)),
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

  return {
    name: `${firstName} ${lastName}`,
    gender,
    street: `${streetNum} ${street}`,
    city: cityData.city,
    state: cityData.state,
    zip: zipData.zip,
    phone: randomPhone(getStateAbbr(stateName)),
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

  return {
    name: `${firstName} ${lastName}`,
    gender,
    street: `${streetNum} ${street}`,
    city: cityInfo.city,
    state: cityInfo.state,
    zip: zipData.zip,
    phone: randomPhone(getStateAbbr(cityInfo.state)),
  };
}

export function generateAddressForZip(zip: string): Address {
  const zipData = zipcodes.find(z => z.zip === zip);
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const streetNum = randomStreetNumber();
  const street = pick(streets);

  return {
    name: `${firstName} ${lastName}`,
    gender,
    street: `${streetNum} ${street}`,
    city: zipData ? zipData.city : 'Unknown',
    state: zipData ? zipData.state : 'Unknown',
    zip,
    phone: randomPhone(zipData ? getStateAbbr(zipData.state) : ''),
  };
}

export function generatePerson() {
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const cityData = pick(cities);
  const zipData = pick(zipcodes);
  const streetNum = randomStreetNumber();
  const street = pick(streets);

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
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
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
