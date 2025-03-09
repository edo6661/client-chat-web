import { ApiErrorResponse } from '@/types/response.type'
import React from 'react'

const ErrorResponseHandler = (
  { error }: { error: ApiErrorResponse | null }
) => {
  return error && (
    <div className="text-red-500 text-sm mb-4">
      <p>
        {error.message}
      </p>
      {error.errors && (
        <ul>
          {error.errors.map((err) => (
            <li key={err.field}>{err.field}-{err.message}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ErrorResponseHandler