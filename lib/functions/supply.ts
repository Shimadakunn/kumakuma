import { smartWallet } from "@/lib/smart-wallet";
import { UserOpBuilder } from "@/lib/smart-wallet/service/userOps";
import { toast } from "sonner";
import {
  Address,
  EstimateFeesPerGasReturnType,
  Hex,
  encodeFunctionData,
  parseEther,
  parseUnits,
} from "viem";

import {
  AAVE_ABI,
  AAVE_IPOOL_ABI,
  ContractType,
  ERC20_ABI,
  TokenType,
  chains,
} from "@/constants";

const builder = new UserOpBuilder();

type Me = { account: Address; keyId: Hex; pubKey: { x: Hex; y: Hex } };

export async function Supply(
  contract: ContractType,
  token: TokenType,
  me: Me,
  amount: string,
  setIsLoading: (loading: boolean) => void,
  refreshBalance: Function,
  setError: (error: any) => void
) {
  setIsLoading(true);
  try {
    smartWallet.init(chains[token.network]);
    builder.init(chains[token.network]);

    const { maxFeePerGas, maxPriorityFeePerGas }: EstimateFeesPerGasReturnType =
      await smartWallet.client.estimateFeesPerGas();

    let calls;
    if (token.address) {
      calls = SupplyErc20Aave(contract, token, me, amount);
    } else {
      calls = SupplyEthAave(contract, token, me, amount);
    }

    const userOp = await builder.buildUserOp({
      calls,
      maxFeePerGas: maxFeePerGas as bigint,
      maxPriorityFeePerGas: maxPriorityFeePerGas as bigint,
      keyId: me?.keyId as Hex,
    });
    console.log("userOp", userOp);
    const hash = await smartWallet.sendUserOperation({ userOp });
    if (hash === null) {
      toast.error("Transaction failed");
      throw new Error("Transaction failed");
    }
    console.log("user op sent", hash);
    toast.success("Transaction sent to blockchain");
    const receipt = await smartWallet.waitForUserOperationReceipt({ hash });
    toast.success("Transaction executed successfully");
    refreshBalance();
    setIsLoading(false);
    return receipt;
  } catch (e: any) {
    toast.error("Transaction failed");
    console.error(e);
    setError(e);
    setIsLoading(false);
    return e;
  }
}

function SupplyEthAave(
  contract: ContractType,
  token: TokenType,
  me: Me,
  amount: string
) {
  const calls = [
    {
      dest: contract.address as Hex,
      value: parseEther(amount),
      data: encodeFunctionData({
        abi: AAVE_ABI,
        functionName: "depositETH",
        args: [contract.ipoolAddress as Hex, me!.account, 0],
      }),
    },
  ];
  return calls;
}

function SupplyErc20Aave(
  contract: ContractType,
  token: TokenType,
  me: Me,
  amount: string
) {
  const approve = {
    dest: token.address as Hex,
    value: parseUnits("0", 6),
    data: encodeFunctionData({
      abi: ERC20_ABI,
      functionName: "approve",
      args: [contract.ipoolAddress as Hex, parseUnits(amount, token.decimals!)],
    }),
  };
  const supply = {
    dest: contract.ipoolAddress as Hex,
    value: parseUnits("0", 6),
    data: encodeFunctionData({
      abi: AAVE_IPOOL_ABI,
      functionName: "supply",
      args: [
        token.address as Hex,
        parseUnits(amount, token.decimals!),
        me!.account,
        0,
      ],
    }),
  };

  return [approve, supply];
}
