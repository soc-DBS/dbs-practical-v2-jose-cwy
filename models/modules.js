const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.create = function create(modCode, modName, creditUnit) {
  return prisma.module.create({
    data: {
      modCode: modCode,
      modName: modName,
      creditUnit: parseInt(creditUnit)
    }
  }).then(function (module) {
    return module;
  }).catch(function (error) {
    if (error.code === 'P2002') {
      throw new Error('Module already exists');
    }
    throw error;
  });
};


module.exports.updateByCode = function updateByCode(code, creditUnit) {
  return prisma.module.update({
    where: { modCode: code },
    data: { creditUnit: parseInt(creditUnit) }
  })
  .then(function (module) {
    // Return the updated module if needed, or leave blank
    return module;
  })
  .catch(function (error) {
    // Handle error when module with the given code is not found (P2025)
    if (error.code === 'P2025') {
      throw new Error('Module not found');
    }
    throw error;
  });
};


module.exports.deleteByCode = function deleteByCode(code) {
  return prisma.module.delete({
    where: { modCode: code }
  })
  .then(function (module) {
    return module;
  })
  .catch(function (error) {
    if (error.code === 'P2025') {
      throw new Error('Module not found');
    }
    throw error;
  });
};


module.exports.retrieveAll = function retrieveAll() {
  return prisma.module.findMany()
    .then(function (modules) {
      return modules; 
    })
    .catch(function (error) {
      throw error;
    });
};


module.exports.retrieveByCode = function retrieveByCode(code) {
  return prisma.module.findUnique({
    where: { modCode: code }
  })
  .then(function (module) {
    if (!module) {
      throw new Error('Module not found');
    }
    return module; 
  })
  .catch(function (error) {
    throw error;
  });
};

