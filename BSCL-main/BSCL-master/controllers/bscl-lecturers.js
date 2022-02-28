'use strict';
require('dotenv').config();
const fs = require('fs').promises;
const { Web3Storage, File } = require('web3.storage');
const { ethers } = require('ethers');
const formidable = require('formidable');

const BsclContract = require('../contracts/BBscl.json').abi;

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

////Check Roles = Lecturer
exports.verify = async (User_ID_Roles) => {
  const { authentication } = await parseForm(User_ID_Roles, {
    checkRoles: lecturer,
    checkToken: False
        return {status: 'Error', message: 'Users Not Found'};
  });

//Submit Lesson
const parseForm = (formLesson) => {
  return new Promise((resolve) => {
    parse(form, (error, fields, files) => {
      if (error)
        return { status: 'Error', message: 'Submission failed' };

      if (!fields.title)
        return {
          status: 'Error',
          message: 'Title Required'};

      if (!fields.desc)
        return {
          status: 'Error',
          message: 'Description Required'};

      resolve({
        Title: fields.title,
        Description: fields.desc,
         return {status: 'Success', message: 'Congratulation you have successfully submit lesson'};
      });
    });
  });
};

//get E-Portfolio
exports.get = async (User_ID,id_class,id_portfolio) => {
  const contractResult = await contracts.r.get(portfolio);
    return{
      status: 'Ok',
      message: `Portfolio found`,
      data: {
        assessment: contractResult.User_ID,
        assessment: contractResult.id_class,
        assessment: contractResult.id_portfolio
          return {student.portfolio};
      }else {
        status: 'False',
        message: `Portfolio not found`,
      }
    };
  };

  //Submit E-Assessment
  const parseForm = (formAssessment) => {
    return new Promise((resolve) => {
      parse(form, (error, fields) => {
        if (error)
          return { status: 'Error', message: 'Assessment not valid' };

        if (!fields.grade)
          return {
            status: 'Error',
            message: 'grade Required'};

        if (!fields.comment)
          return {
            status: 'Error',
            message: 'Comment Required'};

        resolve({
          grade: fields.grade,
          comment: fields.comment,
           return {status: 'Success', message: 'Congratulation you have successfully submit Assessment'};
        });
      });
    });
  };

//Lesson & Assessment to Blockchain
const onRootCidReady = (hash) => {
  throw hash;
};
const web3storage = new Web3Storage({ token: WEB3STORAGE_TOKEN });

//Lesson & Assessment to IPFS (Merkle Tree)
exports.validate = async (lesson_hash && assessment_hash) => {
  const Submission = await fs.readFile(id_portfolio && id_assessment);
  const metadata = {
    assets.hash,
    assets.user_id,
    assets.issue_time,
    assets.course_info,
    assets.lesson_asset,
    assets.assessment_asset,

  };
  const assets = [
    new assets([id_portfolio && id_assessment], 'portfolio, assessment'),
    new Submission([JSON.stringify(metadata)], 'metadata')
  ];

  const Bscl_hash = addToIPFS(assets);
  const contractResult = await contracts.rw.add(Bscl_hash);

      return{
        status: 'OK',
        message: 'Assets uploaded successfully',
        data: contractResult
      };
    };
};
