using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using FinalltechArt.Service.Interfaces;
using DataTransferObject;


namespace FinalItechArt.Web.Controllers
{
    [Route("send_drugs/")]
    [ApiController]
    public class SendToClinicsController : ControllerBase
    {
        IDrugUnitService DrugService;
        public SendToClinicsController(IDrugUnitService _DrugService)
        {
            DrugService = _DrugService;
           
        }

        [HttpGet]
        public IActionResult GetView()
        {
            DataCountDrugType drugTypecounts=new DataCountDrugType();

            DrugService.CountDrugTypes(drugTypecounts);

            return Ok(drugTypecounts);
        }

        [HttpPost]
        public IActionResult GetClinics()
        {          
            return Ok(DrugService.GetClinics());
        }
        [Route("send_drugs")]
        [HttpPost]
        public IActionResult SendDrugs([FromBody]DataCountDrugType SendInfo)
        {
            
            DrugService.SendDrugs(SendInfo);
            return Ok();
        }


    }
}