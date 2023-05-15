import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Interfaces/Product.interface';
import { ProductService } from 'src/app/Services/product.service';
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public listProducts!: Product[];
  public productSelected!: Product | null;
  public titleModal = '';
  public idDelete = 0;
  public isLoading = false;
  public productForm!: FormGroup;

  public fileTemp!: File | null;
  public imgSelected: any | ArrayBuffer = '/assets/img/01.png';

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService
    ) { }

  ngOnInit(): void {
    this.load();
  }

  load(){

    this.isLoading = true;
    this.productForm = this.fb.group({
      nameProduct: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      price: [0, [Validators.required]],
      stock: [0, [Validators.required]]
    });


    this.productService.ProductsListByShop(parseInt(localStorage.getItem('shopId') || '0' ))
    .subscribe(products => {
      this.listProducts = products;
      this.isLoading = false;
    })
  }


  submit(){
    
    if (!this.productForm.valid ) {
      this.toastr.error("Todos los campos * son obligatorios", "Error")
      return;
    };

    this.isLoading = true;
    let productSend: Product;

    if (this.productSelected) {
      productSend = {
        nameProduct: this.productForm.value.nameProduct || '',
        codigo: this.productForm.value.codigo || '',
        descripcion: this.productForm.value.descripcion || '',
        price: this.productForm.value.price || '',
        stock: this.productForm.value.price || '',
        urlImage: this.imgSelected,
        shopId: parseInt(localStorage.getItem('shopId') || '0' ),
        idPorduct: this.productSelected.idPorduct
      }
      // servicio de actualización
      this.productService.UpdateProduct(productSend, this.fileTemp)
      .subscribe(resp => {
        this.isLoading = false;

        if (resp.idPorduct == 0) {
          this.toastr.error("No se pudo actualizar el producto, intentalo de nuevo", "Error")
          return;
        }

        const close = document.getElementById('closemodal');
        close?.click();
        this.toastr.success(`${resp.nameProduct} actualizado correctamente`, "Actualizado!")
        this.load();
        this.fileTemp = null;
        this.productForm.reset();
        this.imgSelected = '/assets/img/01.png';
      })
    }
    else {

      if (this.fileTemp === undefined || this.fileTemp === null) {
        this.toastr.error("Necesitas eligir una imagen del produto", "Error")
        return;
      }
      productSend = {
        nameProduct: this.productForm.value.nameProduct || '',
        codigo: this.productForm.value.codigo || '',
        descripcion: this.productForm.value.descripcion || '',
        price: this.productForm.value.price || '',
        stock: this.productForm.value.stock || '',
        shopId: parseInt(localStorage.getItem('shopId') || '0' ),
        idPorduct: 0
      }

      this.productService.AddProduct(productSend, this.fileTemp)
      .subscribe(resp => {
        this.isLoading = false;

        if (resp.idPorduct == 0) {
          this.toastr.error("No se pudo regitrar el producto, intentalo de nuevo", "Error")
          return;
        }

        const close = document.getElementById('closemodal');
        this.toastr.success(`${resp.nameProduct} agregado correctamente`, "Agregado!")
        close?.click();
        this.load();
        this.fileTemp = null;
        this.productForm.reset();
        this.imgSelected = '/assets/img/01.png';
      })
    }
  }


  openModal(data: Product | null): void{
    if (data === null) {
      this.productForm.reset();
      this.titleModal = "Nuevo Producto";
      this.productSelected = null;
      this.fileTemp = null;
      this.imgSelected = '/assets/img/01.png';
    }
    else {
      this.titleModal = `Actualizar ${data.nameProduct}`
      this.productSelected = data;
      this.fileTemp = null;
      const { nameProduct, codigo, descripcion, price, stock, urlImage, } = data;
      this.productForm.setValue({
        nameProduct,
        codigo,
        descripcion,
        price,
        stock
      });
      this.imgSelected = urlImage;
    }
  }

  delete(){
    this.productService.DeleteProduct(this.idDelete)
    .subscribe((resp:any) => {

      if (!resp.ok) {
        this.toastr.error(resp.message, "Error")
        this.idDelete = 0;
        return;
      }
      const close = document.getElementById('deletemodal');
      close?.click();
      this.load();
      this.toastr.success(resp.message, "Eliminado")

    })
  }

  deleteModal(id: number){
    this.idDelete = id;
  }

  fileChange(event: any):void{

    let that = this;
    let file = null;
    file = <File>event.target.files[0];
    if (!event.target.files && !event.target.files[0]) { 
      $('#iPortada').text('Selecciona una imagen');
      this.toastr.error('No hay imagen.');
      return;
    }
    if (file.size >= 4000000) {
      $('#iPortada').text('Selecciona una imagen');
      this.toastr.error('La imagen es muy grande.');
      return;
    }
    const reader = new FileReader();
    reader.onload = e => this.imgSelected = reader.result;
    reader.readAsDataURL(file);
    
    that.fileTemp = file;
    
    
  }

}
