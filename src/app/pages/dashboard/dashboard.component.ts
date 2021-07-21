import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LinkService } from 'src/app/services/link.service';
import { Link } from 'src/app/models/link.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  linksForm: FormGroup;
  user?: User;
  links: Link[] = [];
  defaultAvatar = 'https://i1.wp.com/csgobuff.pro/img/empty-avatar.jpg';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private linkService: LinkService,
    private router: Router
  ) {
    this.linksForm = this.formBuilder.group({
      url: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // 35 -> ID of a previous created user
    const userId = this.authService.userId || '35';
    this.authService.getUser(userId).subscribe((user: User) => {
      this.user = user;
    });
    this.loadLinks();
  }

  registerLink() {
    const { url, name } = this.linksForm.value;
    this.linkService.createLink(url, name).subscribe((link: Link) => {
      console.log(link);
      this.linksForm.reset();
      this.loadLinks();
    });
  }

  deleteLink(id: string) {
    this.linkService.deleteLink(id).subscribe((_) => {
      this.loadLinks();
    });
  }

  loadLinks() {
    this.linkService.getLinks().subscribe((links: Link[]) => {
      this.links = links;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
