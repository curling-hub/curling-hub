import http, { IncomingMessage, ServerResponse } from 'http'
import { apiResolver } from 'next/dist/server/api-utils/node'


/**
 * Create a mock for supertest
 * @param apiHandler Next API handler
 * @returns 
 */
export default function(apiHandler: Function) {
    const apiPreviewPropsMock = {
        previewModeId: 'id',
        previewModeEncryptionKey: 'key',
        previewModeSigningKey: 'key',
    }
    const requestListener = (req: IncomingMessage, res: ServerResponse) => {
        apiResolver(
            req,
            res,
            undefined,
            apiHandler,
            apiPreviewPropsMock,
            true,
        )
    }
    return requestListener
}
