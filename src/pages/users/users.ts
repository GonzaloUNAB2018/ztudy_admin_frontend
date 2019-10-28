import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { CreateUserPage } from '../create-user/create-user';
import { UserPage } from '../user/user';


@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  id: any;
  users: any[];
  teachers: any[];
  studs: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider: AngularFireProvider,
    public loadingCtrl: LoadingController
    ) {
      
      this.id = navParams.get('id')
      this.getUsers(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  getUsers(id){
    let load = this.loadingCtrl.create({
      content: 'Cargando Usuarios'
    });
    load.present();
    this.afProvider.getUsers(id).valueChanges().subscribe(users=>{
      this.users = users;
      this.teachers = this.users.filter(user=>user.profile==='teacher');
      this.studs = this.users.filter(user=>user.profile==='student');
      if(users){
        load.dismiss();
      }
    })
  }

  createUser(){
    this.navCtrl.push(CreateUserPage, {id:this.id});
  }

  goToUserPage(uid, sex, profile){
    this.navCtrl.push(UserPage, {id:this.id, uid:uid, sex:sex, profile:profile});
  }

  filterUsersOfType(profile: string){
    return this.users.filter(user => user.profile === profile)
  }

}
