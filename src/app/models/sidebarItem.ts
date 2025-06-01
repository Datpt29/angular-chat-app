import { SafeHtml } from "@angular/platform-browser";

export interface sidebarItem {
    id: number,
    name: string,
    icon: SafeHtml,
    path: string
}