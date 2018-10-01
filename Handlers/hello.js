module.exports = (req, res, next) => {
    logger.info('info')
    logger.error('error')
    logger.debug('debug info')
    logger.event('event')

    res.status(200).send({ foo: 'bar' })

    next()
}
