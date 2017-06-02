package com.cloudzon.config;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.dialect.lock.OptimisticEntityLockException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.cloudzon.common.Constant;
import com.cloudzon.dto.ErrorDto;
import com.cloudzon.dto.ValidationErrorDTO;
import com.cloudzon.exception.BaseWebApplicationException;
import com.cloudzon.exception.FieldErrorException;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

	private static final Logger logger = LoggerFactory
			.getLogger(GlobalControllerExceptionHandler.class);

	/**
	 * initBinder is used by validator for add validation for class like Date
	 * etc.
	 * 
	 * @param binder
	 *            used for register new validator
	 */
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		// validate date format
		SimpleDateFormat dateFormat = new SimpleDateFormat(Constant.DATE_FORMAT);

		// register java.util.Date class
		binder.registerCustomEditor(Date.class, new CustomDateEditor(
				dateFormat, true));
	}

	@ExceptionHandler(BaseWebApplicationException.class)
	@ResponseBody
	public ErrorDto webApplicationException(
			BaseWebApplicationException baseWebApplicationException,
			HttpServletResponse response) {
		logger.error("webApplicationException", baseWebApplicationException);
		response.setStatus(baseWebApplicationException.getStatus());
		return new ErrorDto(baseWebApplicationException.getErrorMessage(),
				baseWebApplicationException.getErrorCode(),
				baseWebApplicationException.getDeveloperMessage());
	}

	@ExceptionHandler(FieldErrorException.class)
	@ResponseBody
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public Map<String, Object> fieldErrorException(
			FieldErrorException fieldErrorException) {
		logger.error("fieldErrorException", fieldErrorException);
		Map<String, Object> responseData = null;
		responseData = new HashMap<String, Object>();
		responseData.put("errors", fieldErrorException.getValidationErrorDTO()
				.getFieldErrors());
		return responseData;
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseBody
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public Map<String, Object> processValidationError(
			MethodArgumentNotValidException ex) {
		logger.error("processValidationError", ex);
		BindingResult result = ex.getBindingResult();
		List<FieldError> fieldErrors = result.getFieldErrors();
		Map<String, Object> responseData = null;
		responseData = new HashMap<String, Object>();
		responseData.put("errors", processFieldErrors(fieldErrors)
				.getFieldErrors());
		return responseData;
	}

	private ValidationErrorDTO processFieldErrors(List<FieldError> fieldErrors) {
		ValidationErrorDTO dto = new ValidationErrorDTO();

		for (FieldError fieldError : fieldErrors) {
			dto.addFieldError(fieldError.getField(),
					fieldError.getDefaultMessage());
		}

		return dto;
	}

	@ExceptionHandler(value = { HttpRequestMethodNotSupportedException.class })
	@ResponseBody
	@ResponseStatus(value = HttpStatus.METHOD_NOT_ALLOWED)
	public Map<String, Object> methodNotSupportedException(
			HttpRequestMethodNotSupportedException exception) {
		logger.error("HttpRequestMethodNotSupportedException", exception);
		Map<String, Object> responseData = new HashMap<String, Object>();
		responseData.put("message", exception.getMessage());
		exception.printStackTrace();
		return responseData;
	}

	@ExceptionHandler(value = { HttpMediaTypeNotSupportedException.class })
	@ResponseBody
	@ResponseStatus(value = HttpStatus.UNSUPPORTED_MEDIA_TYPE)
	public Map<String, Object> httpMediaTypeNotSupportedException(
			HttpMediaTypeNotSupportedException exception) {
		logger.error("httpMediaTypeNotSupportedException", exception);
		Map<String, Object> responseData = new HashMap<String, Object>();
		responseData.put("message", exception.getMessage());
		exception.printStackTrace();
		return responseData;
	}

	@ExceptionHandler(value = { HttpMessageNotReadableException.class })
	@ResponseBody
	@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
	public Map<String, Object> httpMessageNotReadableException(
			HttpMessageNotReadableException exception) {
		logger.error("httpMessageNotReadableException", exception);
		Map<String, Object> responseData = new HashMap<String, Object>();
		responseData.put("message", "Not Valid Json Format");
		exception.printStackTrace();
		return responseData;
	}

	@ExceptionHandler(value = { OptimisticEntityLockException.class })
	@ResponseBody
	@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
	public Map<String, Object> optimisticEntityLockException(
			OptimisticEntityLockException exception) {
		logger.error("optimisticEntityLockException", exception);
		Map<String, Object> responseData = new HashMap<String, Object>();
		responseData.put("message", "Multiple update found");
		return responseData;
	}
}
