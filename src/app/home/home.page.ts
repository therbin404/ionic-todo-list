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
  completedTasks = [];

  /********* Toasts ************/
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
        message: 'La tâche "'+ this.tasks[index].todo +'"a bien été supprimée',
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
/**************End toasts ********** */

/*
-0 taches a faire et des taches faites: Bravo vert et gras
-Des taches a faire et des taches faites: Phrase dynamique "Vous avez fait X et il vous reste Y"
-X taches a faire, et 0 taches faites -> Feignasse, bouge-toi le cul ! en gras, rouge, capitales
 */

  async statement() {
    if (this.tasks.length == 0 && this.completedTasks.length > 0) {
      document.querySelector('#statement').innerHTML = 'Bravo ! Vous avez terminé toutes vos tâches !';
    }
    else if (this.tasks.length > 0 && this.completedTasks.length == 0) {
      document.querySelector('#statement').innerHTML = 'Bouge toi le cul !';
    }
    else if (this.tasks.length != 0 && this.completedTasks.length != 0) {
      document.querySelector('#statement').innerHTML = 'Vous avez fait '+ this.completedTasks.length +' tâches, et il vous reste '+ this.tasks.length +' tâches à faire !';
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
            this.statement();
          }
        }
      ]
    });

    await alert.present();
  }

  async removeTask(task) {
    let index = this.tasks.findIndex(p => p.todo == task); // Sert à retourner l'index de la tâche recherchée

    const alert = await this.alertController.create({
      header: 'Voulez-vous vraiment supprimer la tâche suivante: "'+ this.tasks[index].todo +'" ?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.taskRemoved(true, index);
            this.tasks.splice(index, 1);
            this.statement();
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

  async checkTask(task) {
    let index = this.tasks.findIndex(p => p.todo == task); // Sert à retourner l'index de la tâche recherchée
    
    this.completedTasks.push(task);
    this.tasks.splice(index, 1);
    this.statement();
  }

}
