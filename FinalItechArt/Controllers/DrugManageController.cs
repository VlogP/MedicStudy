using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FinalltechArt.DB.DBRepository;
using FinalltechArt.DB.Models;
using FinalltechArt.DB.Interfaces;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FinalItechArt.Web.Infrastructure;
using FinalltechArt.Service.Interfaces;
using DataTransferObject;

namespace FinalItechArt.Web.Controllers
{
    [Route("drugmanage/")]
    [ApiController]
    public class DrugManageController : ControllerBase
    {
        IMapper Mapper;
        IDrugUnitService DrugService;
        public DrugManageController(IDrugUnitService _DrugService, IMapper _Mapper)
        {
            DrugService = _DrugService;
            Mapper = _Mapper;
        }
        
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(DrugService.GetAll());

        }

        [HttpPost]
        public IActionResult AddDrug([FromBody]DrugDTO NewDrug)
        {
            
            if (!DrugService.Check(NewDrug.DrugUnitId)) return BadRequest();

            DrugService.Add(Mapper.Map<DrugUnit>(NewDrug));
            return Ok();

        }

       
        [HttpPost]
        [Route("delete/")]
        public IActionResult DeleteDrug([FromBody]DrugDTO NewDrug)
        {
        
            if (DrugService.Check(NewDrug.DrugUnitId)) return BadRequest();

            DrugService.Delete(NewDrug.DrugUnitId);
            return Ok();

        }

        [Route("Sort")]
        [HttpPost]
        public IActionResult Sort([FromBody]DrugDTO NewDrug)
        {
           
            
            return Ok(DrugService.Sort(NewDrug.Sort));

        }



    }
}