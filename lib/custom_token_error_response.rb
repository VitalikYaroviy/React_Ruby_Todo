module CustomTokenErrorResponse
  def body
    {
      status_code: 401,
      message: ("incorrectly entered data, or unverified email"),
      result: [{ answer: "error" }]
    }
  end
end
