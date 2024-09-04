class Pile {
    total_height: number;
    palate_height: number;
    net_height: number;
    pic1_name: string;
    pic2_name: string;
    label: string;
}
export class CreatePileHeightDto {
    order_height: number;
    piles: Pile[];

}
