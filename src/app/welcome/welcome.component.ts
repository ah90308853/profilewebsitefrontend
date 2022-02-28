import { Component, OnInit } from '@angular/core';
import { IsAnimationDoneServiceComponent } from '../is-animation-done-service/is-animation-done-service.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit 
{
  private animationText: String = "";
  private buildingPhrase: String[] = [""];
  private cursor: String[] = ["_", " ", " ", " "];
  private animationDone: boolean[] = [false];
  private animationSequenceComplete: boolean = false;
  private arrayIndex: number = 0;

  constructor(private isAnimationDoneService: IsAnimationDoneServiceComponent) { }

  ngOnInit(): void 
  {
    let text = ["run buildWebsite.exe", "Hello World!", "I'm Andrew", "Hoeschen."];
    this.playAnimation(text);
    this.animateCursor(0, false);
  }

  playAnimation(text: String[])
  {
    if (this.arrayIndex == text.length)
    {
      this.animationSequenceComplete = true;
      this.isAnimationDoneService.setAnimationDone(this.animationSequenceComplete);
      return;
    }
    this.animationText = text[this.arrayIndex];
    this.buildingPhrase[this.arrayIndex] = "";
    let length = this.animationText.length;
    let index = 0;
    this.animationDone[this.arrayIndex] = false;

    let interval = setInterval(() => 
    {
      this.concatNextLetter(index, this.arrayIndex);
      index++;
      if (index == length)
      {
        clearInterval(interval);
        this.animationDone[this.arrayIndex] = true;
        this.arrayIndex++;
        if (this.arrayIndex == text.length)
        {
          this.animateCursor(this.arrayIndex, true)
        }
        else
        {
          this.animateCursor(this.arrayIndex, false);
        }
        this.playAnimation(text);
      }
    }, 150);
  }

  animateCursor(arrayIndex: number, lastElementFlag: boolean)
  {
    let interval = setInterval(() =>
    {
      if(!lastElementFlag)
      {
        if (this.animationDone[arrayIndex])
        {
          this.cursor[arrayIndex] = " ";
          clearInterval(interval);
          return;
        }
      }
      else
      {
        arrayIndex = this.arrayIndex - 1;
      }
      if (this.cursor[arrayIndex].match("_"))
      {
        this.cursor[arrayIndex] = " ";
      }
      else
      {
        this.cursor[arrayIndex] = "_";
      }
    }, 400);
  }

  concatNextLetter(index: number, arrayIndex: number)
  {
    this.buildingPhrase[arrayIndex] = this.buildingPhrase[arrayIndex].concat(this.animationText.charAt(index));
  }

  scroll(id: string) 
  {
    console.log(id);
    let el = document.getElementById(id);
    if (el)
    {
      el.scrollIntoView({behavior: 'smooth'});
    }
    else
    {
      console.log("could not find element");
    }
  }

  getBuildingPhrase(indexArray: number): String 
  {
    return this.buildingPhrase[indexArray];
  }

  getAnimationDone(indexArray: number): boolean
  {
    return this.animationDone[indexArray];
  }

  getCursor(indexArray: number): String
  {
    return this.cursor[indexArray];
  }

  getAnimationSequenceComplete(): boolean
  {
    return this.animationSequenceComplete;
  }
}
