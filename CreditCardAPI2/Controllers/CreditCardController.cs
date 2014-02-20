using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using CreditCardAPI2.Models;

namespace CreditCardAPI2.Controllers
{
    public class CreditCardController : ApiController
    {
        // GET api/creditcard
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/creditcard/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/creditcard[FromBody]
        public HttpResponseMessage Post(CreditCardModel cc)
        {
            HttpResponseMessage response = null;

            try {
                //validate credit card here
                if (true)
                {
                    response = Request.CreateResponse<CreditCardResponse>(HttpStatusCode.OK, new CreditCardResponse() { Authorized = true, Reason = string.Empty });
                }
                else
                {
                    response = Request.CreateErrorResponse(HttpStatusCode.PreconditionFailed, "Some message here");
                }
            }
            catch(Exception e) {
                response = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
           
            return response;
        }

        // PUT api/creditcard/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/creditcard/5
        public void Delete(int id)
        {
        }
    }
}
