import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('GalleryService', () => {
    let injector: TestBed;
    let service: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });
        injector = getTestBed();
        service = injector.get(ApiService);
        httpMock = injector.get(HttpTestingController);
    });
    afterEach(() => {
        httpMock.verify();
    });
    describe('#getList', () => {
        it('should return an Observable<List[]>', () => {
        const mockData = {
          totalElements: 1,
          data: [
            {
              id: '123',
              address: 'TEST',
              availableFromDate: 'test',
              availableFromNowOn: true,
              building: 'test',
              countryCode: 'test',
              details: 'test',
              direction: 'testing',
              energyCertificate: 'test',
              gasCertificate: 'test',
              isProtectedBuilding: false,
              localization: 'test',
              title: 'test',
              neighborhood: 'test',
              type: 'test',
              teaserImageUrl: 'test',
              documents: []
            }
          ]
        };
        service.getList().subscribe(res => {
            expect(res.totalElements).toBe(1);
        });

        const req = httpMock.expectOne(`${service.apiUrl}/units`);
        expect(req.request.method).toBe('GET');
        req.flush(mockData);
        });
    });
});
