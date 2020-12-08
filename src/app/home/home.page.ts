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

  async taskRemoved(removed, index = null) {
    if (removed) {
      const toast = await this.toastController.create({
        message: 'La tâche '+ this.tasks[index].todo +'a bien été supprimée',
        duration: 3000
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'La tâche n\'a pas été supprimée',
        duration: 3000
      });
      toast.present();
    }
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
          }
        }
      ]
    });

    await alert.present();
  }

  async removeTask(task) {
    var index = this.tasks.findIndex(p => p.todo == task); // Sert à retourner l'index de la tâche recherchée

    const alert = await this.alertController.create({
      header: 'Voulez-vous vraiment supprimer la tâche suivante: '+ this.tasks[index].todo +' ?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.taskRemoved(true, index);
            this.tasks.splice(index, 1);
          }
        },
        {
          text: 'Non',
          handler: () => {
            this.taskRemoved(false);
          }
        }
      ]
    });

    await alert.present();
  
  }

}
