// app/Validators/AlgoValidator.ts
import { validator, schema } from '@ioc:Adonis/Core/Validator';
import algosdk from 'algosdk';

const algoAddresses = {
    'V5AZSRSFJL2YNZV74KMVHMTXENI46BHSMU6IM3ZQWHWNCSVSVJGESUZ4RU': { optIn: true },
    'VVP3CQSXPEXDFJMEIMDHFJAFJYFETRBLEZEJ5HA46USC5FMGNNKLXTUTKQ': { optIn: false },
};

export class AlgoValidator {
  
  constructor(private algoReceivingAddr: string) {

  }

  public schema = schema.create({
    algoReceivingAddr: schema.string(),
  });

  public messages = {
    'algoReceivingAddr.required': 'The algoReceivingAddr field is required.',
  };

  public async validateAlgoAddress() {
    await validator.validate({
      schema: this.schema,
      messages: this.messages,
      data: {
        algoReceivingAddr: this.algoReceivingAddr,
      },
    });

    try {
      if (!algosdk.isValidAddress(this.algoReceivingAddr)) {
        throw new Error('Invalid Algo Receiving Address');
      }

      if (!(algoAddresses[this.algoReceivingAddr]?.optIn || false)) {
        throw new Error('Please Opt-In USDE to send ether');
      }
    } catch (error) {
      throw new Error(error.message || 'Validation failed');
    }
  }
}



// import algosdk from 'algosdk';

// interface AlgoAddresses {
//     [key: string]: {
//         optIn: boolean;
//     };
// }

// const algoAddresses: AlgoAddresses = {
//     'V5AZSRSFJL2YNZV74KMVHMTXENI46BHSMU6IM3ZQWHWNCSVSVJGESUZ4RU': { optIn: true },
//     'VVP3CQSXPEXDFJMEIMDHFJAFJYFETRBLEZEJ5HA46USC5FMGNNKLXTUTKQ': { optIn: false },
// };

// async function isOptedIn(algoReceivingAddr: string): Promise<boolean> {
//     return algoAddresses[algoReceivingAddr]?.optIn || false;
// }

// async function isValidAlgoAddress (address: string): Promise<boolean> {
//     try {
//         return algosdk.isValidAddress(address);
//     } catch (error) {
//         console.error('Enter valid algorand address:', error);
//         return false;
//     }
// };

// export {
//     isOptedIn,
//     isValidAlgoAddress
// }