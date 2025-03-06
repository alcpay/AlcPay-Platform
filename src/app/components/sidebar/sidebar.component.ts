import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col h-full">
      <!-- Mobile Sidebar -->
      <div *ngIf="sidebarOpen" class="fixed inset-0 bg-gray-900/80 z-50 lg:hidden">
        <div class="fixed inset-0 flex">
          <div class="relative flex w-full max-w-xs flex-1 bg-white">
            <div class="absolute top-0 left-full flex w-16 justify-center pt-5">
              <button type="button" class="-m-2.5 p-2.5" (click)="sidebarOpen = false">
                <span class="sr-only">Close sidebar</span>
                &#10006;
              </button>
            </div>
            <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
              <div class="flex h-16 shrink-0 items-center">
                <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li *ngFor="let item of navigation">
                    <a [href]="item.href" [ngClass]="item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold">
                      <span [ngClass]="item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'">&#9679;</span>
                      {{ item.name }}
                    </a>
                  </li>
                  <li>
                    <div class="text-xs font-semibold text-gray-400">Your teams</div>
                    <ul role="list" class="-mx-2 mt-2 space-y-1">
                      <li *ngFor="let team of teams">
                        <a [href]="team.href" [ngClass]="team.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold">
                          <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium" [ngClass]="team.current ? 'border-indigo-600 text-indigo-600' : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600'">
                            {{ team.initial }}
                          </span>
                          <span class="truncate">{{ team.name }}</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="mt-auto">
                    <a href="#" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                      &#9881; Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <!-- Desktop Sidebar -->
      <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r border-gray-200 bg-white px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li *ngFor="let item of navigation">
              <a [href]="item.href" [ngClass]="item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'" class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold">
                <span [ngClass]="item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'">&#9679;</span>
                {{ item.name }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
})
export class SidebarComponent {
  sidebarOpen = false;
  navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Documents', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
  ];
  teams = [
    { name: 'Heroicons', href: '#', initial: 'H', current: false },
    { name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { name: 'Workcation', href: '#', initial: 'W', current: false },
  ];
}
