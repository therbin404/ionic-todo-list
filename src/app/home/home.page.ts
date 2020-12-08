import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertController: AlertController, public toastController: ToastController) {}
  
  tasks = []; // Array to store all tasks

  async taskAdded() {
    const toast = await this.toastController.create({
      message: 'La tâche a bien été ajoutée',
      duration: 3000
    });
    toast.present();
  }

  async addTask() {
    const alert = await this.alertController.create({
      header: 'Ajouter une nouvelle tâche',
      inputs: [
        {
          name: 'todo',
          placeholder: 'Que devrez-vous faire ?',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Ajouter',
          handler: data => {
            this.taskAdded();
            this.tasks.push(data);
            console.log(this.tasks);
          }
        }
      ]
    });

    await alert.present();
  }

}
