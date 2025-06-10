import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../data-access/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  roles: string[] = ['admin', 'user'];
  newUser = {
    name: '',
    email: '',
    password: '',
    role_id: 2,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

  addUser() {
    this.userService.createUser(this.newUser).subscribe(() => {
      this.getUsers();
      this.newUser = { name: '', email: '', password: '', role_id: 2 };
    });
  }

  deleteUser(id: number) {
    if (confirm('Xác nhận xóa?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUsers();
      });
    }
  }

  changeRole(userId: number, newRole: string) {
    const roleId = newRole === 'admin' ? 1 : 2;
    this.userService.updateRole(userId, roleId).subscribe(() => {
      this.getUsers();
    });
  }

  editUser(user: any) {
    // Gợi ý: mở modal hoặc input form riêng
    alert('Chức năng sửa sẽ làm sau nếu cần');
  }
}
