export class Product {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public photo: string,
    public price: number,
    public stock: number
  ) {}
}
