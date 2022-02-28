import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollServiceComponent
{
  currentSection: BehaviorSubject<string> = new BehaviorSubject('welcome');

  private sections: string[] = ['welcome', 'bio', 'panel', 'resume'];
  private linkStates: boolean[] = [true, false, false, false];


  constructor() 
  {
    document.addEventListener('scroll', () => 
    {
      this.keepTrack();
    });
  }

  keepTrack() 
  {
    const viewHeight = window.innerHeight;
    for (var section of this.sections) 
    {
      const element = document.getElementById(section);
      if (element != null) 
      {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < viewHeight / 2) //rect.top >= 0 && rect.top < viewHeight / 2
        {
          this.linkStates[this.getCurrentSectionIndex()] = false;
          this.currentSection.next(section);
          this.linkStates[this.getCurrentSectionIndex()] = true;
        }
      } 
      else 
      {}
    }
  }

  getCurrentSection(): BehaviorSubject<string>
  {
    return this.currentSection;
  }
  
  getCurrentSectionIndex(): number
  {
    var i: number = 0;
    
    for (i; i < this.sections.length; i++)
    {
      if (this.currentSection.value === this.sections[i])
      {
        return i;
      }
    }

    return -1;
  }

  getSectionLinkState(sectionIndex: number): boolean
  {
    return this.linkStates[sectionIndex];
  }
}