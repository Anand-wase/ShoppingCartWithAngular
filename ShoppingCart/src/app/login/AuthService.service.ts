import { Injectable } from '@angular/core';
import { User } from './user.model';
import { DUMMY_USERS } from '../DUMMY_DATA/DUMMY_USERS';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(){
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers)
      localStorage.setItem('users', JSON.stringify(DUMMY_USERS));
  }
  
isLoginSuccessful(email: string | null='' , password:string | null = ''): boolean{
  let successfulLogin = false;
  successfulLogin = DUMMY_USERS.some((u: User) => u.email.toLowerCase() === email?.toLowerCase() && u.password === password);
  if (successfulLogin) {
    let currentUser: User | undefined = DUMMY_USERS.find((u: User) => u.email.toLowerCase() === email?.toLowerCase() && u.password === password);
    localStorage.setItem('currentUser',JSON.stringify(currentUser));
    localStorage.setItem('userRole', currentUser?.role || '');
    // this.router.navigate(['/user']);
    return true
  } 
  return false;
}

isLoggedIn(): boolean {
let currentUser= localStorage.getItem('currentUser');
return currentUser!=null && currentUser!= undefined && currentUser!='';
}
currentUser(): User | null {
 let user = localStorage.getItem('currentUser');
 return user ? JSON.parse(user) : null;
}
getRole(): string {
  let role = localStorage.getItem('userRole');
  return role ? role : '';
}
logout():void{
  localStorage.removeItem('currentUser');
  localStorage.removeItem('userRole');
}
}
