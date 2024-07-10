import readlinesync = require("readline-sync");
import { colors } from './src/util/Colors';
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { ContaController } from "./src/coontroller/ContaController";

export function main() {

    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
    let titular: string; 
    const tipoContas = ['Conta Corrente', 'Conta Poupanca'];

    const contas: ContaController = new ContaController();

    // Novas Instâncias da Classe ContaCorrente (Objetos)
    contas.cadastrar(new ContaCorrente (contas.gerarNumero(), 1234, 1, 'Amanda Magro', 1000000.00, 100000));
    contas.cadastrar(new ContaCorrente (contas.gerarNumero(), 1234, 1, 'João da Silva', 1000.00, 100.00));

    // Novas Instâncias da Classe ContaPoupanca (Objetos)
    contas.cadastrar(new ContaPoupanca (contas.gerarNumero(), 1234, 2, 'Érica Virgilio', 1000.00, 10));
    contas.cadastrar(new ContaPoupanca (contas.gerarNumero(), 1234, 2, 'Gabrielli Virgilio', 1000.00, 10));

    while (true) {

        console.log(colors.bg.black, colors.fg.greenstrong, 
                    "¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨");
        console.log("                                                     ");
        console.log("                       Tcbank                        ");
        console.log("                                                     ");
        console.log("¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨");
        console.log("                                                     ", 
        colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 9) {
            console.log(colors.fg.greenstrong, 
                "\nTcBank   - O seu Futuro começa aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong,
                    "\n\nCriar Conta\n\n", colors.reset);

                console.log('Digite o Número da Agência: ');
                agencia = readlinesync.questionInt("");

                console.log('Digite o Nome do Titular da Conta: ');
                titular = readlinesync.question("");

                console.log('Digite o Tipo da Conta: ');
                tipo = readlinesync.keyInSelect(tipoContas, "", { cancel: false }) + 1;

                console.log('Digite o Saldo da Conta: ');
                saldo = readlinesync.questionFloat("");
                
            switch (tipo) {
                case 1:
                    console.log('Digite o Limite da Conta: ');
                    limite = readlinesync.questionFloat("");
                    contas.cadastrar(
                        new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite)
                    )
                    break;   
                case 2:
                    console.log('Digite a Data de Aniversário da Conta: ');
                    aniversario = readlinesync.questionInt("");
                    contas.cadastrar(
                        new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario)
                    )
                    break;
            }

                    keyPress()
                    break;
                case 2:
                    console.log(colors.fg.whitestrong,
                        "\n\nListar todas as Contas\n\n", colors.reset);
                    contas.listarTodas();
                    keyPress()
                    break;
                case 3:
                    console.log(colors.fg.whitestrong,
                    "\n\nConsultar dados da Conta - por número\n\n", colors.reset);

                    console.log("Digite o número da Conta: ")
                    numero = readlinesync.questionInt("");

                    contas.procurarPorNumero(numero);

                    keyPress()
                    break;
                case 4:
                console.log(colors.fg.whitestrong, 
                    "\n\nAtualizar dados da Conta\n\n", colors.reset);

                    console.log("Digite o número da Conta: ")
                    numero = readlinesync.questionInt("");

                    let conta = contas.buscarnoArray(numero);

                    if(conta) {

                    console.log('Digite o Número da Agência: ')
                    agencia = readlinesync.questionInt("");

                    console.log('Digite o Nome do Titular da Conta: ')
                    titular = readlinesync.question("");

                    console.log('Digite o Saldo da Conta: ')
                    saldo = readlinesync.questionInt("");

                    tipo = conta.tipo;

                    switch (tipo) {
                        case 1:
                            console.log('Digite o Limite da Conta: ');
                            limite = readlinesync.questionFloat("");
                            contas.atualizar(
                                new ContaCorrente(numero, agencia, tipo, titular, saldo, limite)
                            )
                            break;
                        case 2:
                            console.log('Digite a Data de Aniversário da Conta: ');
                            aniversario = readlinesync.questionInt("");
                            contas.atualizar(
                                new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario)
                            )
                            break; 
                    }

                    }else{
                        console.log(`\A Conta não foi encontrada! `)
                    }

                keyPress()
                break;
            
            case 5:
                console.log(colors.fg.whitestrong, 
                    "\n\nApagar uma Conta\n\n", colors.reset);

                    console.log("Digite o número da Conta: ")
                    numero = readlinesync.questionInt("");

                    contas.deletar(numero);

                keyPress()
                break;
            case 6:
                console.log(colors.fg.whitestrong, 
                    "\n\nSaque\n\n", colors.reset);

                    console.log("Digite o número da Conta: ")
                    numero = readlinesync.questionInt("");

                    console.log("Digite o valor do Saque: ")
                    valor = readlinesync.questionFloat("");

                    contas.sacar(numero,valor);

                keyPress()
                break;
            case 7:
                console.log(colors.fg.whitestrong, 
                    "\n\nDepósito\n\n", colors.reset);

                    console.log("Digite o número da Conta: ")
                    numero = readlinesync.questionInt("");

                    console.log("Digite o valor do Deposito: ")
                    valor = readlinesync.questionFloat("");

                    contas.depositar(numero,valor);

                keyPress()
                break;
            case 8:
                console.log(colors.fg.whitestrong, 
                    "\n\nTransferência entre Contas\n\n", colors.reset);

                    console.log("Digite o número da Conta de Origem: ")
                    numero = readlinesync.questionInt("");

                    console.log("Digite o número da Conta de Destino: ")
                    numeroDestino = readlinesync.questionInt("");

                    console.log("Digite o valor do Saque: ")
                    valor = readlinesync.questionFloat("");

                    contas.transferir(numero, numeroDestino, valor);

                keyPress()
                break;
            default:
                console.log(colors.fg.whitestrong, 
                    "\nOpção Inválida!\n", colors.reset);

                keyPress()
                break;
        }
    }

}

/* Função com os dados da pessoa desenvolvedora */
function sobre(): void {
    console.log("\n¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨");
    console.log("Projeto Desenvolvido por: Gabrielli ");
    console.log("Generation Brasil - gabivirgilio@oultook.com ");
    console.log("https://github.com/gabisvs");
    console.log("¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main();

