'use strict';
require('dotenv').config();
const fs = require('fs').promises;
const { Web3Storage, File } = require('web3.storage');
const { ethers } = require('ethers');
const formidable = require('formidable');

const BsclContract = require('../contracts/Bscl.json').abi;

const LOCAL_DEVELOPMENT = process.env.LOCAL_DEVELOPMENT;
const LOCAL_WALLET_PRIVATE_KEY = process.env.LOCAL_WALLET_PRIVATE_KEY;
const LOCAL_CONTRACT_ADDRESS = process.env.LOCAL_CONTRACT_ADDRESS;
const ALCHEMY_NETWORK = process.env.ALCHEMY_NETWORK;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const WEB3STORAGE_TOKEN = process.env.WEB3STORAGE_TOKEN;

const createContract = () => {
  const provider = LOCAL_DEVELOPMENT
    ? new ethers.getDefaultProvider('http://127.0.0.1:8545')
    : new ethers.providers.AlchemyProvider(ALCHEMY_NETWORK, ALCHEMY_API_KEY);

  const wallet = LOCAL_DEVELOPMENT
    ? new ethers.Wallet(LOCAL_WALLET_PRIVATE_KEY, provider)
    : new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

  return LOCAL_DEVELOPMENT
    ? {
        r: new ethers.Contract(
          LOCAL_CONTRACT_ADDRESS,
          BsclContract,
          provider
        ),
        rw: new ethers.Contract(
          LOCAL_CONTRACT_ADDRESS,
          BsclContract,
          wallet
        )
      }
    : {
        r: new ethers.Contract(CONTRACT_ADDRESS, BsclContract, provider),
        rw: new ethers.Contract(CONTRACT_ADDRESS, BsclContract, wallet)
      };
};
const contracts = createContract();

////Check Roles = Student
exports.verify = async (User_ID_Roles) => {
  const { authentication } = await parseForm(User_ID_Roles, {
    checkToken: False
        return {status: 'Error', message: 'Users Not Found'};
  });

//get lesson E-Course
exports.get = async (User_ID,id_class) => {
  const contractResult = await contracts.r.get(student.class);
    return{
      status: 'OK',
      message: `Student Class found`,
      data: {
        class: contractResult.User_ID,
        class: contractResult.id_class,
        return {student.class};
      }
    };
  };

 //Enroll
const parseForm = (formEnroll) => {
  return new Promise((resolve) => {
    parse(form, (error, fields) => {
      if (error)
        return { status: 'Error', message: 'Enroll code incorrect' };

      if (!fields.enroll)
        return {
          status: 'Error',
          message: 'Enroll Code Required'};

      resolve({
        enrollcode: fields.enroll,
         return {status: 'Success', message: 'Congratulation you have successfully joined'};
      });
    });
  });
};

//E-Portfolio
const parseForm = (formPortfolio) => {
  return new Promise((resolve) => {
    parse(form, (error, fields, files) => {
      if (error)
        return { status: 'Error', message: 'Portfolio not correct' };

      if (!fields.title)
        return {
          status: 'Error',
          message: 'Title Required'};

      if (!fields.desc)
        return {
          status: 'Error',
          message: 'Description Required'};

      if (!fields.files)
        return {
          status: 'Error',
          message: 'Files Required'};

      resolve({
        name: fields.enroll,
         return {status: 'Success', message: 'Congratulation you have successfully submit'};
      });
    });
  });
};

//get E-Assessment
exports.get = async (User_ID,id_class,id_portfolio) => {
  const contractResult = await contracts.r.get(assessment);
    return{
      status: 'Ok',
      message: `Assessment found`,
      data: {
        assessment: contractResult.User_ID,
        assessment: contractResult.id_class,
        assessment: contractResult.id_portfolio
          return {student.assessment.class};
      }else {
        status: 'False',
        message: `Assessment not found`,
      }
    };
  };

//Portfolio to Blockchain
const onRootCidReady = (hash) => {
  throw hash;
};
const web3storage = new Web3Storage({ token: WEB3STORAGE_TOKEN });

//Portfolio to IPFS (Merkle Tree)
exports.validate = async (portfolio) => {
  const Submission = await fs.readFile(id_portfolio);
  const metadata = {
    portfolio.hash,
    portfolio.user_id,
    portfolio.issue_time,
    portfolio.course_info

  };
  const assets = [
    new Submission([id_portfolio], 'portfolio'),
    new Submission([JSON.stringify(metadata)], 'metadata')
  ];

  const Bscl_hash = addToIPFS(portfolio);
  const contractResult = await contracts.rw.add(Bscl_hash);

      return{
        status: 'OK',
        message: 'Portfolio uploaded successfully',
        data: contractResult
      };
    };
};
