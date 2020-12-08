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
  sentence = 'Aucune tâche encore ajoutée';
  caseInformation = 0;

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


  async statement() { //A MODIFIER (faire un for, compter le nombre de completed == 1, le nombre de completed == 0, et reprendre les conditions avec ces données)
    let doneTasks = 0;
    let undoneTasks = 0;

    for (let task of this.tasks) {
      if (task.completed == 1) {
        doneTasks++;
      } else {
        undoneTasks ++;
      }


      if(undoneTasks == 0 && doneTasks > 0) {
        this.sentence = 'Bravo ! Vous avez terminé toutes vos tâches !';
        this.caseInformation = 1;
      } else if (undoneTasks > 0 && doneTasks > 0) {
        this.sentence = 'Vous avez fait '+ doneTasks +' tâche, et il vous en reste '+ undoneTasks +' à faire !';
        this.caseInformation = 2;
      } else if (undoneTasks > 0 && doneTasks == 0) {
        this.sentence = 'Feignasse, bouge-toi le cul !';
        this.caseInformation = 3;
      } else {
        this.sentence = 'Aucune tâche en cours ni terminée';
        this.caseInformation = 0;
      }
    }
    this.tasks.sort(function(a, b){
      if(a.completed < b.completed) return -1;
      if(a.completed == b.completed) return 0;
      if(a.completed > b.completed) return 1;
    });
  }

  colorInformation() {
    if (this.caseInformation == 0) {
      return 'primary';
    } else if (this.caseInformation == 1) {
      return 'success';
    } else if (this.caseInformation == 2) {
      return 'warning';
    } else if (this.caseInformation == 3) {
      return 'danger';
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
            data.completed = 0;
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
    
    this.tasks[index].completed = 1;
    this.statement();
    this.tasks.sort(function(a, b){ // Les return sont pour classer le tableau. Avec le sort, les -1 seront forcément au début, et les 1 a la fin
      if(a.completed < b.completed) return -1; 
      if(a.completed == b.completed) return 0;
      if(a.completed > b.completed) return 1;
    });
  }

}
