import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../Services/domain/cart.service';
import { ClienteService } from '../../Services/domain/cliente.services';
import { PedidoService } from '../../Services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codPedido: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {

      this.pedido = this.navParams.get('pedido');
      
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO{
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  valorTotalPedido(){
    return this.cartService.valorTotal();
  }

  checkout(){
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        console.log(response.headers.get('location'));
        this.codPedido = this.extractId(response.headers.get('location'));
        console.log(this.codPedido);
      },
      error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  back(){
    this.navCtrl.setRoot('CartPage');
  }

  home(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  private extractId(location: string): string{
    let position = location.lastIndexOf('/');
    console.log("position - ",position)
    return location.substring(position + 1, location.length);
  }

}
