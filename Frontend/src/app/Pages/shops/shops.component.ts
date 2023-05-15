import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Shop } from 'src/app/Interfaces/Shop.interface';
import { ShopService } from 'src/app/Services/shop.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  public listShops!: Shop[];
  public shopSelected!: Shop | null;
  public titleModal = '';
  public idDelete = 0;
  public isLoading = false;
  public shopForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private shopService: ShopService,
    private toastr: ToastrService) { }

  ngOnInit(): void {


    this.load();
  }

  load(){

    this.shopForm = this.fb.group({
      nameShop: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });


    this.shopService.listShops()
    .subscribe(shops => {
      this.listShops = shops;
    })
  }

  submit(){
    if (!this.shopForm.valid) {
      this.toastr.error("Todos los campos * son obligatorios", "Error")
      return;
    };

    this.isLoading = true;
    let shopSend: Shop;


    if (this.shopSelected) {
      shopSend = {
        nameShop: this.shopForm.value.nameShop || '',
        address: this.shopForm.value.address || '',
        idShop: this.shopSelected.idShop
      }
      
      this.shopService.UpdateShop(shopSend)
      .subscribe(resp => {
        this.isLoading = false;

        if (resp.idShop == 0) {
          this.toastr.error("No se pudo actualizar la tienda, intentalo de nuevo", "Error")
          return;
        }
        
        this.toastr.success(`${resp.nameShop} Actualizada correctamente`, "Actualizado!")
        const close = document.getElementById('closemodal');
        close?.click();
        this.load();
        this.shopForm.reset();


      })
    }
    else{
      shopSend = {
        nameShop: this.shopForm.value.nameShop || '',
        address: this.shopForm.value.address || '',
        idShop: 0
      }
      this.shopService.AddShop(shopSend)
      .subscribe(resp => {
        this.isLoading = false;

        if (resp.idShop == 0) {
          this.toastr.error("No se pudo regitrar la tienda, intentalo de nuevo", "Error")
          return;
        }
        
        const close = document.getElementById('closemodal');
        this.toastr.success(`${resp.nameShop} agregado correctamente`, "Agregada!")
        close?.click();
        this.load();
        this.shopForm.reset();

      })
    }
  }

  delete(){
    this.shopService.DeleteShop(this.idDelete)
    .subscribe((resp:any) => {


      if (!resp.ok) {
        this.toastr.error(resp.message, "Error")
        this.idDelete = 0;
        return;
      }
      const close = document.getElementById('deletemodal');
      close?.click();
      this.toastr.success(resp.message, "Eliminado")

    })
  }

  deleteModal(id: number){
    this.idDelete = id;
  }
  openModal(data: Shop | null): void{
    if (data === null) {
      this.shopForm.reset();
      this.titleModal = "Nueva tienda";
      this.shopSelected = null;
    }
    else {
      this.titleModal = `Actualizar ${data.nameShop}`
      this.shopSelected = data;

      const { address, nameShop } = data;
      this.shopForm.setValue({
        nameShop,
        address
      });
    }
  }
}
