export const calculateGrossAmount = (
    net_amount: number,
    vat_amount: number
): number => {
    return Number(net_amount) + Number(vat_amount)
}

