using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FinalItechArt.Web.Models;
using System.Security.Claims;
using DataTransferObject;
using FinalltechArt.Service.Interfaces;
using AutoMapper;
using FinalltechArt.DB.Models;
 
namespace FinalItechArt.Web.Controllers
{
    
    [Route("cabinet/")]   
    [ApiController]
    public class CabinetController : Controller
    {

        IMapper mapper;
        ICabinetService CabinetService;
        public CabinetController(ICabinetService _CabinetService,IMapper _mapper)
        {
               mapper = _mapper;
               CabinetService = _CabinetService;
        }

        
        [HttpPost]
        [Route("secondary")]
        public IActionResult UpdateInfo([FromBody]UserDTO CabinetModel)
        {
            string UserId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name).Value;
            
            CabinetService.Update(CabinetModel, Int32.Parse(UserId));

            return Ok();
        }

        [HttpPost]
        [Route("primary")]
        public IActionResult UpdatePassword([FromBody]UserDTO NewPassword)
        {
            
            string UserId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name).Value;

            CabinetService.Update(NewPassword.NewPassword, Int32.Parse(UserId));

            return Ok();
        }
        
        [HttpGet]
        [Route("getdata")]
        public  IActionResult GetData()
        {
            
                string UserId =  User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name).Value;
            
              User CurrentUser= CabinetService.GetCurrentData(Int32.Parse(UserId));

            return Ok(mapper.Map<UserDTO>(CurrentUser));
        }


    }
}