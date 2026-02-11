

export const findOne = async ({ model, fillter = {}, select = '', options = {} } = {}) => {

    const doc = model.findOne(fillter).select(select);
    if (options.populate) {
        doc.populate(options.populate);
    }
    if (options.lean) {
        doc.lean();
    }

    return await doc.exec();

};
export const findById = async ({ model, fillter ='', select = '', options = {} } = {}) => {

    const doc = model.findById(fillter).select(select);
    if (options.populate) {
        doc.populate(options.populate);
    }
    if (options.lean) {
        doc.lean();
    }

    return await doc.exec();

};

export const create = async ({ model, data = [{}], options = { validateBeforeSave: true } } = {}) => {
    return await model.create(data, options);
}

export const createOne = async ({ model, data = {}, options = { validateBeforeSave: true } } = {}) => {
    const [doc] = await create({ model, data:[data], options });
    return doc;
}