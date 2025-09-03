// dummy-investment-data.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface DummyInvestmentData {
  id: number;
  Date: string;
  State: string;
  Region: string;
  Locality: string;
  Section: string;
  'L.G.A': string;
  'L.C.D.A': string;
  'Street Name': string;
  'Updated By': string;
  [key: string]: any; 
}

export interface Amenity {
  amenity_name: string;
  sub_amenities: string;
}

@Injectable({
  providedIn: 'root'
})
export class DummyInvestmentDataService {

  private generateBaseData(id: number): Partial<DummyInvestmentData> {
    const states = ['Lagos', 'Abuja', 'Rivers', 'Kano', 'Ogun'];
    const regions = ['Victoria Island', 'Lekki', 'Mainland', 'Island', 'Surulere'];
    const localities = ['Phase 1', 'Phase 2', 'GRA', 'Estate', 'Layout'];
    const sections = ['A', 'B', 'C', 'D', 'E'];
    const lgas = ['Lagos Island', 'Lagos Mainland', 'Surulere', 'Ikeja', 'Eti-Osa'];
    const lcdas = ['Victoria Island', 'Ikoyi', 'Lagos Island East', 'Lagos Island West'];
    const streets = ['Ademola Street', 'Tiamiyu Savage', 'Adeola Odeku', 'Kofo Abayomi', 'Sanusi Fafunwa'];
    const updatedBy = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown'];

    return {
      id,
      Date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      State: states[Math.floor(Math.random() * states.length)],
      Region: regions[Math.floor(Math.random() * regions.length)],
      Locality: localities[Math.floor(Math.random() * localities.length)],
      Section: sections[Math.floor(Math.random() * sections.length)],
      'L.G.A': lgas[Math.floor(Math.random() * lgas.length)],
      'L.C.D.A': lcdas[Math.floor(Math.random() * lcdas.length)],
      'Street Name': streets[Math.floor(Math.random() * streets.length)],
      'Updated By': updatedBy[Math.floor(Math.random() * updatedBy.length)]
    };
  }

  private generateResidentialData(id: number): DummyInvestmentData {
    const buildingTypes = ['Apartment', 'Duplex', 'Bungalow', 'Terrace', 'Detached'];
    const statuses = ['Completed', 'Under Construction', 'Planned', 'Renovating'];
    const periods = ['Monthly', 'Quarterly', 'Annually'];
    const developers = ['Dangote Group', 'Church Gate', 'Mixta Africa', 'Propertygate', 'Foursquare Development'];
    const contractors = ['Julius Berger', 'Costain', 'Arab Contractors', 'Dantata & Sawoe', 'Setraco Nigeria'];

    return {
      ...this.generateBaseData(id),
      'Building Type': buildingTypes[Math.floor(Math.random() * buildingTypes.length)],
      'No of Units': Math.floor(Math.random() * 50) + 1,
      'No of Beds': Math.floor(Math.random() * 5) + 1,
      Status: statuses[Math.floor(Math.random() * statuses.length)],
      'Completion Year': 2020 + Math.floor(Math.random() * 5),
      Period: periods[Math.floor(Math.random() * periods.length)],
      'Rental Price': (Math.random() * 5000000 + 500000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'Sale Price': (Math.random() * 50000000 + 5000000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      Developer: developers[Math.floor(Math.random() * developers.length)],
      Contractor: contractors[Math.floor(Math.random() * contractors.length)],
      'Facilities Manager': 'Knight Frank Nigeria',
      'Annual Service Charge': (Math.random() * 500000 + 50000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'Contact Name': 'Property Manager',
      'Contact Number': '+234' + Math.floor(Math.random() * 9000000000 + 1000000000),
      Amenities: 'Swimming Pool, Gym, Security, Parking, Generator'
    } as DummyInvestmentData;
  }

  private generateLandData(id: number): DummyInvestmentData {
    const statuses = ['Available', 'Under Offer', 'Sold', 'Reserved'];
    const periods = ['Immediate', '30 Days', '60 Days', '90 Days'];

    return {
      ...this.generateBaseData(id),
      'Land Area': `${Math.floor(Math.random() * 2000) + 100} sqm`,
      Status: statuses[Math.floor(Math.random() * statuses.length)],
      Period: periods[Math.floor(Math.random() * periods.length)],
      'Rental Price': (Math.random() * 1000000 + 100000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'Sale Price': (Math.random() * 20000000 + 2000000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'Contact Name': 'Land Agent',
      'Contact Number': '+234' + Math.floor(Math.random() * 9000000000 + 1000000000)
    } as DummyInvestmentData;
  }

  private generateHealthcareData(id: number): DummyInvestmentData {
    const classifications = ['General Hospital', 'Specialist Hospital', 'Clinic', 'Medical Center'];
    const statuses = ['Operational', 'Under Construction', 'Planned', 'Upgrading'];
    const operators = ['Lagos State Health Service', 'Federal Medical Centre', 'Private Healthcare', 'NGO Healthcare'];

    return {
      ...this.generateBaseData(id),
      Classification: classifications[Math.floor(Math.random() * classifications.length)],
      'No of Beds': Math.floor(Math.random() * 200) + 10,
      Status: statuses[Math.floor(Math.random() * statuses.length)],
      'Completion Year': 2018 + Math.floor(Math.random() * 7),
      Period: 'Operational',
      Amenities: 'ICU, Laboratory, Pharmacy, Emergency Unit, X-Ray',
      Operator: operators[Math.floor(Math.random() * operators.length)],
      Contractor: 'Medical Construction Ltd',
      Developer: 'Healthcare Development Corp',
      'Facilities Manager': 'Medical Facilities Management'
    } as DummyInvestmentData;
  }

  private generateRetailData(id: number): DummyInvestmentData {
    const classifications = ['Shopping Mall', 'Strip Mall', 'Standalone Store', 'Market Complex'];
    const statuses = ['Fully Leased', 'Partially Leased', 'Available', 'Under Construction'];
    const developers = ['ShopRite', 'Spar', 'Game Stores', 'Next Cash and Carry'];

    return {
      ...this.generateBaseData(id),
      Classification: classifications[Math.floor(Math.random() * classifications.length)],
      NLFA: `${Math.floor(Math.random() * 5000) + 100} sqm`,
      'No of Floors': Math.floor(Math.random() * 5) + 1,
      Status: statuses[Math.floor(Math.random() * statuses.length)],
      'Completion Year': 2019 + Math.floor(Math.random() * 6),
      Period: 'Annual',
      'Rental Price': (Math.random() * 10000000 + 1000000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'Sale Price': (Math.random() * 100000000 + 10000000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'Annual Service Charge': (Math.random() * 2000000 + 200000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      Amenities: 'Parking, Security, Air Conditioning, Escalators, Food Court',
      Developer: developers[Math.floor(Math.random() * developers.length)],
      Contractor: 'Retail Construction Nigeria',
      'Facilities Manager': 'Retail Facility Services',
      'Contact Name': 'Leasing Manager',
      'Contact Number': '+234' + Math.floor(Math.random() * 9000000000 + 1000000000)
    } as DummyInvestmentData;
  }

  private generateHotelData(id: number): DummyInvestmentData {
    const classifications = ['5-Star Hotel', '4-Star Hotel', '3-Star Hotel', 'Boutique Hotel', 'Business Hotel'];
    const statuses = ['Operational', 'Under Renovation', 'Under Construction', 'Planned'];
    const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Presidential Suite'];

    return {
      ...this.generateBaseData(id),
      Classification: classifications[Math.floor(Math.random() * classifications.length)],
      'Number of Keys': Math.floor(Math.random() * 300) + 50,
      Status: statuses[Math.floor(Math.random() * statuses.length)],
      'Completion Year': 2020 + Math.floor(Math.random() * 5),
      Period: 'Daily',
      'Sale Price': (Math.random() * 5000000000 + 500000000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'Daily Rate': (Math.random() * 150000 + 25000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'Room Type': roomTypes[Math.floor(Math.random() * roomTypes.length)],
      Amenities: 'Restaurant, Bar, Spa, Gym, Pool, Conference Rooms, WiFi',
      Operator: 'International Hotel Group',
      Contractor: 'Hospitality Construction Ltd',
      Developer: 'Hotel Development Nigeria'
    } as DummyInvestmentData;
  }

  private generateOfficeData(id: number): DummyInvestmentData {
    const classifications = ['Grade A', 'Grade B', 'Grade C'];
    const statuses = ['Fully Leased', 'Partially Leased', 'Available', 'Under Construction'];

    return {
      ...this.generateBaseData(id),
      Classification: classifications[Math.floor(Math.random() * classifications.length)],
      NLFA: `${Math.floor(Math.random() * 3000) + 200} sqm`,
      Status: statuses[Math.floor(Math.random() * statuses.length)],
      'Completion Year': 2018 + Math.floor(Math.random() * 7),
      Period: 'Annual',
      'Rental Price': (Math.random() * 15000000 + 2000000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'Sale Price': (Math.random() * 200000000 + 20000000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      Developer: 'Commercial Property Developers',
      Contractor: 'Office Construction Nigeria',
      'Facilities Manager': 'Commercial Facility Management',
      'Annual Service Charge': (Math.random() * 3000000 + 300000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'No of Floors': Math.floor(Math.random() * 20) + 5,
      'Contact Name': 'Property Manager',
      'Contact Number': '+234' + Math.floor(Math.random() * 9000000000 + 1000000000),
      Amenities: 'Parking, Security, Elevators, Air Conditioning, Backup Power, WiFi'
    } as DummyInvestmentData;
  }

  private generateIndustrialData(id: number): DummyInvestmentData {
    const classifications = ['Warehouse', 'Manufacturing', 'Logistics', 'Cold Storage'];
    const buildingTypes = ['Steel Frame', 'Concrete', 'Pre-fab', 'Mixed'];
    const statuses = ['Operational', 'Available', 'Under Construction', 'Planned'];

    return {
      ...this.generateBaseData(id),
      Classification: classifications[Math.floor(Math.random() * classifications.length)],
      'Building Type': buildingTypes[Math.floor(Math.random() * buildingTypes.length)],
      'No of Bay': Math.floor(Math.random() * 10) + 1,
      NLFA: `${Math.floor(Math.random() * 10000) + 1000} sqm`,
      Status: statuses[Math.floor(Math.random() * statuses.length)],
      'Completion Year': 2019 + Math.floor(Math.random() * 6),
      Period: 'Annual',
      'Rental Price': (Math.random() * 20000000 + 3000000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'Sale Price': (Math.random() * 300000000 + 50000000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      'Annual Service Charge': (Math.random() * 1000000 + 100000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      Amenities: 'Loading Bay, Security, Power Supply, Water Supply, Drainage',
      'Facilities Manager': 'Industrial Facility Services',
      'Contact Name': 'Industrial Leasing Agent',
      'Contact Number': '+234' + Math.floor(Math.random() * 9000000000 + 1000000000),
      Developer: 'Industrial Development Corporation',
      Contractor: 'Industrial Construction Ltd'
    } as DummyInvestmentData;
  }

  private generateStreetData(id: number): DummyInvestmentData {
    const sectors = ['Residential Estate', 'Commercial District', 'Mixed Development', 'Industrial Zone'];

    return {
      ...this.generateBaseData(id),
      Sector: sectors[Math.floor(Math.random() * sectors.length)],
      'No of Plots': Math.floor(Math.random() * 200) + 20,
      'No of Streets': Math.floor(Math.random() * 15) + 3
    } as DummyInvestmentData;
  }

  private generateEventsData(id: number): DummyInvestmentData {
    const classifications = ['Convention Center', 'Event Hall', 'Conference Center', 'Banquet Hall'];
    const statuses = ['Available', 'Booked', 'Under Renovation', 'Closed'];

    return {
      ...this.generateBaseData(id),
      Classification: classifications[Math.floor(Math.random() * classifications.length)],
      'No of Seats': Math.floor(Math.random() * 2000) + 100,
      Status: statuses[Math.floor(Math.random() * statuses.length)],
      'Completion Year': 2018 + Math.floor(Math.random() * 7),
      Period: 'Daily',
      'Daily Rates': (Math.random() * 500000 + 100000).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }),
      Amenities: 'Sound System, Lighting, Air Conditioning, Parking, Catering Kitchen',
      Developer: 'Event Venue Developers',
      Contractor: 'Event Construction Ltd',
      'Facilities Manager': 'Event Facility Management',
      'Contact Name': 'Event Coordinator',
      'Contact Number': '+234' + Math.floor(Math.random() * 9000000000 + 1000000000)
    } as DummyInvestmentData;
  }

  generateDummyData(sector: string, count: number = 50): DummyInvestmentData[] {
  if (!this.cachedData[sector]) {
    const data: DummyInvestmentData[] = [];

    for (let i = 1; i <= count; i++) {
      let item: DummyInvestmentData;

      switch (sector) {
        case 'residential':
          item = this.generateResidentialData(i);
          break;
        case 'land':
          item = this.generateLandData(i);
          break;
        case 'healthcare':
          item = this.generateHealthcareData(i);
          break;
        case 'retail':
          item = this.generateRetailData(i);
          break;
        case 'hotel':
          item = this.generateHotelData(i);
          break;
        case 'office':
          item = this.generateOfficeData(i);
          break;
        case 'industrial':
          item = this.generateIndustrialData(i);
          break;
        case 'street':
          item = this.generateStreetData(i);
          break;
        case 'events':
          item = this.generateEventsData(i);
          break;
        default:
          item = this.generateResidentialData(i);
      }

      data.push(item);
    }

    // Sort by date (newest first)
    data.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());

    this.cachedData[sector] = data;
  }

  return this.cachedData[sector];
}



  // Mock the paginated API response
  getPaginatedDummyData(sector: string, params: any = {}): Observable<any> {
  const { limit = 250, currentPage = 1 } = params;
  const allData = this.generateDummyData(sector, 500); // now reuses cached data

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = allData.slice(startIndex, endIndex);

  const response = {
    data: paginatedData,
    totalRecords: allData.length,
    totalPages: Math.ceil(allData.length / limit),
    currentPage,
    hasNextPage: endIndex < allData.length,
    hasPreviousPage: currentPage > 1
  };

  return of(response).pipe(delay(500));
}


  private cachedData: { [sector: string]: DummyInvestmentData[] } = {};

  private getCachedData(sector: string): DummyInvestmentData[] {
    if (!this.cachedData[sector]) {
      this.cachedData[sector] = this.generateDummyData(sector, 500);
    }
    return this.cachedData[sector];
  }


  apiGetInvestmentDataById(id: number, sector: string, includeRelated: boolean = false): Observable<any> {
    const allData = this.getCachedData(sector);
    const foundItem = allData.find(item => item.id === id);

    if (!foundItem) {
      // Return an error observable if item not found
      return new Observable(observer => {
        observer.error({ error: 'Investment data not found', status: 404 });
      });
    }

    // Mock API response structure
    const response = {
      data: foundItem,
      message: 'Investment data retrieved successfully',
      status: 'success'
    };

    // Add delay to simulate network request
    return of(response).pipe(delay(300));
  }



  // Alternative version if you want to handle related data
  apiGetInvestmentDataByIdWithRelated(id: number, sector: string, includeRelated: boolean = false): Observable<any> {
    const allData = this.generateDummyData(sector, 500);
    const foundItem = allData.find(item => item.id === id);

    if (!foundItem) {
      return new Observable(observer => {
        observer.error({ error: 'Investment data not found', status: 404 });
      });
    }

    let response: any = {
      data: foundItem,
      message: 'Investment data retrieved successfully',
      status: 'success'
    };

    // If related data is requested, you can add mock related data
    if (includeRelated) {
      response.relatedData = {
        // Add any related data structure you need
        nearbyProperties: allData.filter(item =>
          item.id !== id &&
          item.State === foundItem.State &&
          item.Region === foundItem.Region
        ).slice(0, 5),
        historicalData: [], 
        marketAnalysis: {} 
      };
    }

    return of(response).pipe(delay(300));
  }
}