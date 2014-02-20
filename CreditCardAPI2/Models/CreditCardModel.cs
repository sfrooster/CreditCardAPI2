using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CreditCardAPI2.Models
{
    public class CreditCardModel
    {
        public string CCNumber { get; set; }
        public string CVN { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
    }

    public class CreditCardResponse
    {
        public bool Authorized { get; set; }
        public string Reason { get; set; }
    }
}