import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ApiResponse, ApiUriEnum} from '@shared/model';
import {TokenService} from '@security/service/token.service';
import {ApiService, HttpService, NavigationService} from '@shared/service';
import {map} from 'rxjs/operators';
import {RefreshPayload} from '@security/model/payload/refresh.payload';
import {SigninPayload, SignupPayload, TokenDto} from '@security/model';
import {SigninResponse} from '@security/model/response/signin.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  isAuthenticated = false;

  constructor(public tokenService: TokenService, public override http: HttpService, public navigation: NavigationService) {
    super(http);
  }

  signin(payload: SigninPayload): Observable<ApiResponse> {
    return this.http.post(`${this.baseUrl}${ApiUriEnum.SIGNIN}`, payload).pipe(
      map((response: ApiResponse) => {
        if (response.result) {
          const signinResponse: SigninResponse = response.data as SigninResponse;
          this.tokenService.saveToken(signinResponse.token.access_token);
          this.tokenService.saveRefreshToken(signinResponse.token.refresh_token);
          this.isAuthenticated = true;

          // Pour une question esthétique je met une pause de 2 secondes avant la redirection
          // vers l'écran d'accueil

          setTimeout(()=>
            this.navigation.navigateToSecure(), 2000)
          //
        }
        return response;
      })
    )
  }

  me(): Observable<ApiResponse> {
    return this.http.get(`${this.baseUrl}${ApiUriEnum.ME}`);
  }

  signup(payload: SignupPayload): Observable<ApiResponse> {

    // return of({result: true, data: null, error_code: null})
    return this.http.post(`${this.baseUrl}${ApiUriEnum.SIGNUP}`, payload).pipe(
      map((response: ApiResponse) => {
        if(response.result){

          // Pour une question esthétique je met une pause de 2 secondes avant la redirection
          // vers l'écran de login

          setTimeout(()=>
            this.navigation.navigate('account/signin'), 2000)
        }
        return response;
        }
      )
    )
  }

  refreshToken(refresh: RefreshPayload): Observable<ApiResponse> {
    return this.http.post(`${this.baseUrl}${ApiUriEnum.REFRESH_TOKEN}`, refresh).pipe(
      map((response: ApiResponse) => {
        if (response.result) {
          const tokenResponse: TokenDto = response.data as TokenDto;
          this.tokenService.saveToken(tokenResponse.access_token);
          this.tokenService.saveRefreshToken(tokenResponse.refresh_token);
          this.isAuthenticated = true;
        }
        return response;
      })
    )
  }

  logout(): void {
    this.tokenService.signOut();
    this.isAuthenticated = false;
    this.navigation.navigateToUnsecure();
  }
}
